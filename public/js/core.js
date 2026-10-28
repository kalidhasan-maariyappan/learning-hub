// Shared helpers: HTML escaping, Java syntax highlighter, code editor, and the /api/run client.
(function () {
  'use strict';
  const JT = (window.JT = window.JT || {});

  JT.esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // ---- Java highlighter ----
  const KEYWORDS = new Set(('abstract assert boolean break byte case catch char class const continue default do double else enum ' +
    'extends final finally float for goto if implements import instanceof int interface long native new package private ' +
    'protected public return short static strictfp super switch synchronized this throw throws transient try void volatile ' +
    'while var record yield sealed permits non-sealed true false null').split(' '));
  const TOKEN = new RegExp([
    '(\\/\\*[\\s\\S]*?(?:\\*\\/|$)|\\/\\/[^\\n]*)', // 1 comment
    '("""[\\s\\S]*?(?:"""|$)|"(?:\\\\.|[^"\\\\\\n])*"?|\'(?:\\\\.|[^\'\\\\\\n])*\'?)', // 2 string/char/text block
    '(@[A-Za-z_][\\w.]*)', // 3 annotation
    '(\\b(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|\\d[\\d_]*(?:\\.[\\d_]*)?(?:[eE][+-]?\\d+)?)[lLfFdD]?\\b)', // 4 number
    '([A-Za-z_$][\\w$]*)', // 5 identifier
  ].join('|'), 'g');

  JT.highlight = function (code) {
    let out = '', last = 0, m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(code))) {
      out += JT.esc(code.slice(last, m.index));
      const t = m[0];
      if (m[1]) out += '<span class="t-com">' + JT.esc(t) + '</span>';
      else if (m[2]) out += '<span class="t-str">' + JT.esc(t) + '</span>';
      else if (m[3]) out += '<span class="t-ann">' + JT.esc(t) + '</span>';
      else if (m[4]) out += '<span class="t-num">' + JT.esc(t) + '</span>';
      else if (KEYWORDS.has(t)) out += '<span class="t-kw">' + t + '</span>';
      else if (/^[A-Z]/.test(t)) out += '<span class="t-type">' + t + '</span>';
      else if (code[TOKEN.lastIndex] === '(') out += '<span class="t-fn">' + t + '</span>';
      else out += t;
      last = TOKEN.lastIndex;
    }
    return out + JT.esc(code.slice(last));
  };

  // ---- Editor: transparent textarea over a highlighted <pre> ----
  JT.createEditor = function (host, code, { onRun, minHeight } = {}) {
    host.classList.add('editor');
    host.innerHTML = '<pre aria-hidden="true"></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Java code editor"></textarea>';
    const pre = host.querySelector('pre');
    const ta = host.querySelector('textarea');
    if (minHeight) host.style.minHeight = minHeight;
    const sync = () => {
      // Trailing newline keeps the overlay height equal to the textarea's.
      pre.innerHTML = JT.highlight(ta.value) + '\n';
      pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft;
      if (minHeight) ta.style.height = 'auto', ta.style.height = Math.max(ta.scrollHeight, host.clientHeight) + 'px';
    };
    ta.value = code;
    ta.addEventListener('input', sync);
    ta.addEventListener('scroll', () => { pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; });
    ta.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); onRun && onRun(); return; }
      const { selectionStart: s, selectionEnd: en, value: v } = ta;
      if (e.key === 'Tab') {
        e.preventDefault();
        if (e.shiftKey) {
          const ls = v.lastIndexOf('\n', s - 1) + 1;
          const n = v.slice(ls, ls + 4).match(/^ {0,4}/)[0].length;
          ta.setRangeText('', ls, ls + n, 'preserve');
          ta.setSelectionRange(Math.max(ls, s - n), Math.max(ls, en - n));
        } else ta.setRangeText('    ', s, en, 'end');
        sync();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const ls = v.lastIndexOf('\n', s - 1) + 1;
        let indent = v.slice(ls, s).match(/^\s*/)[0];
        const before = v.slice(0, s).trimEnd();
        if (before.endsWith('{')) indent += '    ';
        let insert = '\n' + indent;
        if (before.endsWith('{') && v.slice(en).trimStart().startsWith('}') && v.slice(en, v.indexOf('\n', en) === -1 ? v.length : v.indexOf('\n', en)).trim() === '}') {
          insert += '\n' + indent.slice(4);
          ta.setRangeText(insert, s, en, 'start');
          ta.setSelectionRange(s + 1 + indent.length, s + 1 + indent.length);
        } else ta.setRangeText(insert, s, en, 'end');
        sync();
      } else if (e.key === '}') {
        const ls = v.lastIndexOf('\n', s - 1) + 1;
        if (/^\s+$/.test(v.slice(ls, s)) && s === en) {
          e.preventDefault();
          const ind = v.slice(ls, s);
          ta.setRangeText(ind.slice(0, Math.max(0, ind.length - 4)) + '}', ls, s, 'end');
          sync();
        }
      }
    });
    sync();
    return { get value() { return ta.value; }, set value(v) { ta.value = v; sync(); }, focus: () => ta.focus(), textarea: ta };
  };

  // ---- Runner ----
  JT.runJava = async function (code, stdin) {
    let res;
    try {
      res = await fetch('/api/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, stdin: stdin || '' }) });
    } catch (err) {
      return { error: 'Cannot reach the local Java runner. Start it with "node server.js" and open the site from http://127.0.0.1:8080/.' };
    }
    let data;
    try { data = await res.json(); } catch { return { error: 'Runner returned an invalid response (HTTP ' + res.status + ').' }; }
    if (!res.ok) return { error: data.error || 'HTTP ' + res.status };
    return data;
  };

  // Render a runner result into a console element; returns the result for further checks.
  JT.showResult = function (consoleEl, r) {
    if (r.error) { consoleEl.innerHTML = '<span class="err">' + JT.esc(r.error) + '</span>'; return; }
    let html = '';
    if (r.phase === 'compile') {
      html += '<span class="sys">Compilation failed:</span>\n<span class="err">' + JT.esc(r.stderr.replace(/^\S*?([A-Za-z_$][\w$]*\.java)/gm, '$1')) + '</span>';
    } else {
      html += JT.esc(r.stdout);
      if (r.stderr) html += '<span class="err">' + JT.esc(r.stderr) + '</span>';
      if (r.timedOut) html += '\n<span class="err">Stopped: the program ran longer than the 10 second limit.</span>';
      if (r.truncated) html += '\n<span class="err">Output truncated (64 KB limit).</span>';
      if (!r.stdout && !r.stderr && !r.timedOut) html += '<span class="sys">(no output)</span>';
      html += '\n<span class="sys">— exit code ' + r.exitCode + ' · compile ' + r.compileMs + ' ms · run ' + r.runMs + ' ms</span>';
    }
    consoleEl.innerHTML = html;
  };

  JT.normalizeOutput = (s) => String(s || '').replace(/\r\n/g, '\n').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();

  // ---- Theme ----
  JT.applyTheme = function () {
    let t = null;
    try { t = localStorage.getItem('jt-theme'); } catch { /* storage blocked */ }
    if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
  };
  JT.toggleTheme = function () {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('jt-theme', t); } catch { /* storage blocked */ }
  };
  JT.applyTheme();
})();
