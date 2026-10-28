// JavaTrail local server: serves the static site and compiles/runs Java code with the local JDK.
// Execution is NOT a security sandbox: submitted code runs with the permissions of this process.
// The server therefore binds to 127.0.0.1 only.
'use strict';

const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const PORT = Number(process.env.PORT) || 8080;
const HOST = '127.0.0.1';
const ROOT = path.join(__dirname, 'public');
const COMPILE_TIMEOUT_MS = 20000;
const RUN_TIMEOUT_MS = 10000;
const MAX_OUTPUT = 64 * 1024;
const MAX_CODE = 100 * 1024;
const MAX_CONCURRENT = 2;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

// Feature version (e.g. 25) read from a JDK's `release` file; 0 when unknown.
function jdkVersion(home) {
  try {
    const m = /JAVA_VERSION="(\d+)/.exec(fs.readFileSync(path.join(home, 'release'), 'utf8'));
    return m ? Number(m[1]) : 0;
  } catch { return 0; }
}

// JAVA_RUNNER_HOME wins when set; otherwise the newest JDK among JAVA_HOME and the default
// install dir, because lessons use modern syntax (text blocks, switch expressions, records).
function findJdk() {
  const exe = process.platform === 'win32' ? '.exe' : '';
  const valid = (home) => home && fs.existsSync(path.join(home, 'bin', 'javac' + exe));
  const make = (home) => ({ javac: path.join(home, 'bin', 'javac' + exe), java: path.join(home, 'bin', 'java' + exe), home, version: jdkVersion(home) });
  if (valid(process.env.JAVA_RUNNER_HOME)) return make(process.env.JAVA_RUNNER_HOME);
  const candidates = [];
  if (process.env.JAVA_HOME) candidates.push(process.env.JAVA_HOME);
  if (process.platform === 'win32') {
    const base = 'C:\\Program Files\\Java';
    try {
      for (const d of fs.readdirSync(base)) candidates.push(path.join(base, d));
    } catch { /* no default install dir */ }
  }
  const found = candidates.filter(valid).map(make).sort((a, b) => b.version - a.version);
  return found[0] || { javac: 'javac', java: 'java', home: '(PATH)', version: 0 };
}
const JDK = findJdk();

function run(cmd, args, { cwd, input = '', timeout }) {
  return new Promise((resolve) => {
    const started = Date.now();
    const child = spawn(cmd, args, { cwd, windowsHide: true });
    let stdout = '', stderr = '', truncated = false, timedOut = false;
    const cap = (buf, chunk) => {
      if (buf.length + chunk.length > MAX_OUTPUT) { truncated = true; child.kill('SIGKILL'); return buf + chunk.slice(0, MAX_OUTPUT - buf.length); }
      return buf + chunk;
    };
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (c) => { stdout = cap(stdout, c); });
    child.stderr.on('data', (c) => { stderr = cap(stderr, c); });
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeout);
    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ code: -1, stdout, stderr: stderr + String(err.message), timedOut, truncated, ms: Date.now() - started });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr, timedOut, truncated, ms: Date.now() - started });
    });
    child.stdin.on('error', () => {});
    child.stdin.end(input);
  });
}

// The public top-level class decides the file name; fall back to the first class with main().
function mainClassName(code) {
  const stripped = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').replace(/"(?:\\.|[^"\\])*"/g, '""');
  const pub = stripped.match(/public\s+(?:final\s+|abstract\s+)*(?:class|record|enum|interface)\s+([A-Za-z_$][\w$]*)/);
  if (pub) return pub[1];
  const any = stripped.match(/(?:class|record)\s+([A-Za-z_$][\w$]*)[^{]*\{[\s\S]*?static\s+void\s+main\s*\(/);
  return any ? any[1] : 'Main';
}

let active = 0;
async function executeJava(code, stdin) {
  const cls = mainClassName(code);
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'javatrail-'));
  try {
    await fsp.writeFile(path.join(dir, cls + '.java'), code, 'utf8');
    const compile = await run(JDK.javac, ['-encoding', 'UTF-8', '-J-Xmx256m', '-Xlint:none', '-d', '.', cls + '.java'], { cwd: dir, timeout: COMPILE_TIMEOUT_MS });
    if (compile.code !== 0) {
      return { phase: 'compile', ok: false, stdout: '', stderr: compile.stderr || compile.stdout, exitCode: compile.code, timedOut: compile.timedOut, ms: compile.ms };
    }
    // Fixed en-US locale: printf/Scanner decimals must not depend on the host's regional settings.
    const exec = await run(JDK.java, ['-Xmx256m', '-Xss8m', '-XX:+UseSerialGC', '-Dfile.encoding=UTF-8', '-Dstdout.encoding=UTF-8', '-Duser.language=en', '-Duser.country=US', '-cp', '.', cls], { cwd: dir, input: stdin, timeout: RUN_TIMEOUT_MS });
    return { phase: 'run', ok: exec.code === 0 && !exec.timedOut, stdout: exec.stdout, stderr: exec.stderr, exitCode: exec.code, timedOut: exec.timedOut, truncated: exec.truncated, ms: compile.ms + exec.ms, compileMs: compile.ms, runMs: exec.ms };
  } finally {
    fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store' });
  res.end(body);
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function handleRun(req, res) {
  // Only accept same-origin JSON posts, so other sites cannot drive the local JDK.
  const origin = req.headers.origin;
  if (origin && origin !== `http://${req.headers.host}`) return sendJson(res, 403, { error: 'Cross-origin requests are not allowed.' });
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return sendJson(res, 415, { error: 'Expected application/json.' });
  let payload;
  try { payload = JSON.parse(await readBody(req, MAX_CODE + 16 * 1024)); } catch { return sendJson(res, 400, { error: 'Invalid or oversized request body.' }); }
  const code = typeof payload.code === 'string' ? payload.code : '';
  const stdin = typeof payload.stdin === 'string' ? payload.stdin.slice(0, 16 * 1024) : '';
  if (!code.trim()) return sendJson(res, 400, { error: 'No code submitted.' });
  if (code.length > MAX_CODE) return sendJson(res, 413, { error: 'Code is too long.' });
  if (active >= MAX_CONCURRENT) return sendJson(res, 429, { error: 'The runner is busy. Try again in a moment.' });
  active++;
  try {
    sendJson(res, 200, await executeJava(code, stdin));
  } catch (err) {
    sendJson(res, 500, { error: 'Runner failure: ' + err.message });
  } finally {
    active--;
  }
}

async function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath);
  // Lesson routes (/java, /java/<slug>) and the try-it page are rendered by the client shell.
  if (rel === '/' ) { res.writeHead(302, { Location: '/java/' }); return res.end(); }
  if (rel === '/java' || rel.startsWith('/java/')) rel = '/index.html';
  if (rel === '/tryit' || rel === '/tryit/') rel = '/tryit.html';
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  try {
    const data = await fsp.readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/run') {
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST.' });
    return handleRun(req, res);
  }
  if (url.pathname === '/api/health') return sendJson(res, 200, { ok: true, jdk: JDK.home, version: JDK.version });
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  serveStatic(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`JavaTrail running at http://${HOST}:${PORT}/java/`);
  console.log(`Using JDK: ${JDK.home}`);
});
