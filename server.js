// JavaTrail local server: serves the static site, compiles/runs Java code with the local JDK and runs Ruby code with the local Ruby.
// Execution is NOT a security sandbox: submitted code runs with the permissions of this process.
// The server therefore binds to 127.0.0.1 only.
'use strict';

const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const PORT = Number(process.env.PORT) || 8081;
const HOST = '127.0.0.1';
const ROOT = path.join(__dirname, 'public');
const COMPILE_TIMEOUT_MS = 20000;
const RUN_TIMEOUT_MS = 10000;
const SPRING_TIMEOUT_MS = 180000;
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

// RUBY_RUNNER_HOME wins when set; otherwise the newest RubyInstaller folder (C:\Ruby34-x64), then PATH.
function findRuby() {
  const exe = process.platform === 'win32' ? 'ruby.exe' : 'ruby';
  const valid = (home) => home && fs.existsSync(path.join(home, 'bin', exe));
  if (valid(process.env.RUBY_RUNNER_HOME)) return { ruby: path.join(process.env.RUBY_RUNNER_HOME, 'bin', exe), home: process.env.RUBY_RUNNER_HOME };
  if (process.platform === 'win32') {
    try {
      const homes = fs.readdirSync('C:\\').filter((d) => /^Ruby\d+/.test(d)).map((d) => 'C:\\' + d).filter(valid).sort().reverse();
      if (homes.length) return { ruby: path.join(homes[0], 'bin', exe), home: homes[0] };
    } catch { /* no RubyInstaller folders */ }
  }
  for (const folder of (process.env.PATH || '').split(path.delimiter)) {
    if (folder && fs.existsSync(path.join(folder, exe))) return { ruby: path.join(folder, exe), home: path.dirname(folder) };
  }
  return null;
}
const RUBY = findRuby();

function run(cmd, args, { cwd, input = '', timeout, env, shell = false }) {
  return new Promise((resolve) => {
    const started = Date.now();
    const child = spawn(cmd, args, { cwd, windowsHide: true, env, shell });
    let stdout = '', stderr = '', truncated = false, timedOut = false;
    const stopTree = () => {
      if (process.platform === 'win32' && child.pid) {
        const killer = spawn('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' });
        killer.on('error', () => child.kill('SIGKILL'));
      } else child.kill('SIGKILL');
    };
    const cap = (buf, chunk) => {
      if (buf.length + chunk.length > MAX_OUTPUT) { truncated = true; stopTree(); return buf + chunk.slice(0, MAX_OUTPUT - buf.length); }
      return buf + chunk;
    };
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (c) => { stdout = cap(stdout, c); });
    child.stderr.on('data', (c) => { stderr = cap(stderr, c); });
    const timer = setTimeout(() => { timedOut = true; stopTree(); }, timeout);
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
let activeSpring = 0;
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

async function executeRuby(code, stdin) {
  if (!RUBY) return { error: 'Ruby is not installed. Install Ruby 3.2 or newer, or set RUBY_RUNNER_HOME, then restart JavaTrail.' };
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'rubytrail-'));
  try {
    await fsp.writeFile(path.join(dir, 'main.rb'), code, 'utf8');
    // UTF-8 for source and I/O so output does not depend on the Windows code page.
    const exec = await run(RUBY.ruby, ['-E', 'UTF-8:UTF-8', 'main.rb'], { cwd: dir, input: stdin, timeout: RUN_TIMEOUT_MS, env: { ...process.env, LANG: 'en_US.UTF-8', TZ: 'UTC' } });
    return { phase: 'run', lang: 'ruby', ok: exec.code === 0 && !exec.timedOut, stdout: exec.stdout.replace(/\r\n/g, '\n'), stderr: exec.stderr.replace(/\r\n/g, '\n').replace(/main\.rb:(\d+)/g, 'line $1'), exitCode: exec.code, timedOut: exec.timedOut, truncated: exec.truncated, ms: exec.ms, runMs: exec.ms };
  } finally {
    fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

function findMaven() {
  const suffix = process.platform === 'win32' ? 'mvn.cmd' : 'mvn';
  const candidates = [];
  if (process.env.MAVEN_HOME) candidates.push(path.join(process.env.MAVEN_HOME, 'bin', suffix));
  for (const folder of (process.env.PATH || '').split(path.delimiter)) if (folder) candidates.push(path.join(folder, suffix));
  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function springPom(course, module) {
  const frameworkDeps = `
    <dependency><groupId>org.springframework</groupId><artifactId>spring-context</artifactId><version>7.0.10</version></dependency>
    <dependency><groupId>org.springframework</groupId><artifactId>spring-aop</artifactId><version>7.0.10</version></dependency>
    <dependency><groupId>org.springframework</groupId><artifactId>spring-jdbc</artifactId><version>7.0.10</version></dependency>
    <dependency><groupId>org.springframework</groupId><artifactId>spring-webmvc</artifactId><version>7.0.10</version></dependency>
    <dependency><groupId>org.springframework</groupId><artifactId>spring-test</artifactId><version>7.0.10</version></dependency>
    <dependency><groupId>com.fasterxml.jackson.core</groupId><artifactId>jackson-databind</artifactId><version>2.21.5</version></dependency>
    <dependency><groupId>org.springframework.security</groupId><artifactId>spring-security-test</artifactId><version>7.0.8</version></dependency>
    <dependency><groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><version>5.11.3</version></dependency>
    <dependency><groupId>org.springframework.security</groupId><artifactId>spring-security-config</artifactId><version>7.0.8</version></dependency>
    <dependency><groupId>org.springframework.security</groupId><artifactId>spring-security-web</artifactId><version>7.0.8</version></dependency>
    <dependency><groupId>org.aspectj</groupId><artifactId>aspectjweaver</artifactId><version>1.9.25.1</version></dependency>
    <dependency><groupId>jakarta.annotation</groupId><artifactId>jakarta.annotation-api</artifactId><version>3.0.0</version></dependency>
    <dependency><groupId>jakarta.validation</groupId><artifactId>jakarta.validation-api</artifactId><version>3.1.1</version></dependency>
    <dependency><groupId>jakarta.persistence</groupId><artifactId>jakarta.persistence-api</artifactId><version>3.2.0</version></dependency>
    <dependency><groupId>jakarta.servlet</groupId><artifactId>jakarta.servlet-api</artifactId><version>6.1.0</version></dependency>
    <dependency><groupId>org.hibernate.validator</groupId><artifactId>hibernate-validator</artifactId><version>9.0.1.Final</version></dependency>
    <dependency><groupId>com.h2database</groupId><artifactId>h2</artifactId><version>2.4.240</version></dependency>`;
  const bootModules = {
    core: '',
    web: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency>',
    validation: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-validation</artifactId></dependency>',
    data: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-data-jpa</artifactId></dependency><dependency><groupId>com.h2database</groupId><artifactId>h2</artifactId><scope>runtime</scope></dependency>',
    security: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-security</artifactId></dependency>',
    securityjwt: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-oauth2-resource-server</artifactId></dependency>',
    test: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-test</artifactId></dependency>',
    actuator: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-actuator</artifactId></dependency>',
    cache: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-cache</artifactId></dependency>',
    kafka: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-kafka</artifactId></dependency>',
    amqp: '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-amqp</artifactId></dependency>',
  };
  const bootDeps = '<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter</artifactId></dependency>' + (bootModules[module] || bootModules.core);
  if (course === 'spring') return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion><groupId>local.javatrail</groupId><artifactId>spring-lab</artifactId><version>1.0</version>
  <properties><maven.compiler.release>17</maven.compiler.release><project.build.sourceEncoding>UTF-8</project.build.sourceEncoding></properties>
  <dependencies>${frameworkDeps}</dependencies>
  <build><plugins><plugin><groupId>org.apache.maven.plugins</groupId><artifactId>maven-compiler-plugin</artifactId><version>3.14.1</version><configuration><parameters>true</parameters></configuration></plugin>
    <plugin><groupId>org.codehaus.mojo</groupId><artifactId>exec-maven-plugin</artifactId><version>3.5.1</version><configuration><cleanupDaemonThreads>true</cleanupDaemonThreads></configuration></plugin>
  </plugins></build>
</project>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>4.1.1</version><relativePath/></parent>
  <groupId>local.javatrail</groupId><artifactId>spring-boot-lab</artifactId><version>1.0</version>
  <properties><java.version>17</java.version><project.build.sourceEncoding>UTF-8</project.build.sourceEncoding></properties>
  <dependencies>${bootDeps}</dependencies>
  <build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin>
    <plugin><groupId>org.codehaus.mojo</groupId><artifactId>exec-maven-plugin</artifactId><version>3.5.1</version><configuration><cleanupDaemonThreads>true</cleanupDaemonThreads></configuration></plugin>
  </plugins></build>
</project>`;
}

function sampleRoute(source) {
  const classPath = (source.match(/@RequestMapping\("([^"]+)"\)/) || [])[1] || '';
  const method = source.match(/@(GetMapping|PostMapping|PutMapping|PatchMapping|DeleteMapping)\("([^"]+)"\)/);
  const verb = method ? method[1].replace('Mapping', '').toUpperCase() : 'GET';
  let route = method ? (classPath + '/' + method[2]).replace(/\/{2,}/g, '/') : classPath || '/';
  route = route.replace(/\{([^/}]+)\}/g, (_, name) => /id/i.test(name) ? '1' : 'Ada');
  return { verb, route };
}

function makeSpringSnippet(course, module, source) {
  const existingPackage = source.match(/^\s*package\s+([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\s*;/m);
  const packageName = course === 'springboot' ? (existingPackage ? existingPackage[1] : 'javatrail.lab') : '';
  const original = source.replace(/^\s*package\s+[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\s*;\s*/m, '');
  const baseImports = [
    'import java.math.*;', 'import java.util.*;', 'import org.springframework.beans.factory.annotation.*;',
    'import org.springframework.context.*;', 'import org.springframework.context.annotation.*;',
    'import org.springframework.stereotype.*;', 'import org.springframework.boot.*;',
    'import org.springframework.boot.autoconfigure.*;',
  ];
  const moduleImports = {
    web: ['import org.springframework.web.bind.annotation.*;', 'import org.springframework.http.*;'],
    validation: ['import org.springframework.web.bind.annotation.*;', 'import org.springframework.http.*;', 'import jakarta.validation.*;', 'import jakarta.validation.constraints.*;'],
    data: ['import javax.sql.DataSource;', 'import jakarta.persistence.*;', 'import org.springframework.data.jpa.repository.*;', 'import org.springframework.jdbc.core.*;', 'import org.springframework.transaction.annotation.*;'],
    security: ['import org.springframework.web.bind.annotation.*;', 'import org.springframework.http.*;', 'import org.springframework.security.config.annotation.web.builders.*;', 'import org.springframework.security.config.annotation.web.configuration.*;', 'import org.springframework.security.config.annotation.method.configuration.*;', 'import org.springframework.security.config.Customizer;', 'import org.springframework.security.web.*;', 'import org.springframework.security.crypto.password.*;', 'import org.springframework.security.core.*;'],
    securityjwt: ['import org.springframework.web.bind.annotation.*;', 'import org.springframework.security.config.annotation.web.builders.*;', 'import org.springframework.security.config.Customizer;', 'import org.springframework.security.web.*;', 'import org.springframework.security.oauth2.jwt.*;'],
    test: ['import org.springframework.web.bind.annotation.*;', 'import org.springframework.http.*;', 'import org.junit.jupiter.api.*;', 'import org.springframework.test.web.servlet.*;', 'import org.springframework.test.web.servlet.setup.*;', 'import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;', 'import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;'],
    actuator: ['import org.springframework.boot.actuate.health.*;'],
    kafka: ['import org.springframework.kafka.annotation.*;', 'import org.springframework.kafka.core.*;'],
    amqp: ['import org.springframework.amqp.rabbit.annotation.*;', 'import org.springframework.amqp.rabbit.core.*;'],
  };
  const frameworkImports = [
    'import java.math.*;', 'import java.util.*;', 'import org.springframework.beans.factory.annotation.*;',
    'import org.springframework.context.*;', 'import org.springframework.context.annotation.*;', 'import org.springframework.stereotype.*;',
    'import javax.sql.DataSource;', 'import org.springframework.context.event.*;',
    'import org.springframework.core.io.*;', 'import org.springframework.jdbc.core.*;', 'import org.springframework.jdbc.datasource.*;',
    'import org.springframework.transaction.*;', 'import org.springframework.transaction.annotation.*;', 'import org.springframework.transaction.support.*;',
    'import org.springframework.web.bind.annotation.*;', 'import org.springframework.http.*;', 'import org.springframework.validation.*;',
    'import org.springframework.web.servlet.config.annotation.EnableWebMvc;', 'import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;',
    'import org.springframework.mock.web.MockServletContext;', 'import org.springframework.test.web.servlet.setup.MockMvcBuilders;',
    'import org.springframework.scheduling.annotation.*;', 'import org.springframework.cache.annotation.*;',
    'import org.springframework.security.config.annotation.web.builders.*;', 'import org.springframework.security.config.annotation.web.configuration.*;',
    'import org.springframework.security.config.annotation.method.configuration.*;', 'import org.springframework.security.config.Customizer;',
    'import org.springframework.security.web.*;', 'import org.springframework.security.crypto.password.*;', 'import org.springframework.security.core.*;',
    'import org.aspectj.lang.*;', 'import org.aspectj.lang.annotation.*;', 'import jakarta.validation.Valid;', 'import jakarta.validation.Validator;', 'import jakarta.validation.ValidatorFactory;',
    'import jakarta.validation.constraints.*;', 'import jakarta.persistence.*;'
  ];
  const imports = (course === 'spring' ? frameworkImports : baseImports.concat(moduleImports[module] || [])).join('\n') + '\n';
  if (course === 'springboot') {
    const code = original.replace(/\s*public\s+static\s+void\s+main\s*\([^)]*\)\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, '')
      .replace(/^\s*@SpringBootApplication(?:\([^)]*\))?\s*$/gm, '')
      .replace(/^\s*public\s+(?=(?:class|record|enum|interface)\b)/gm, '')
      .replace(/\bclass\s+Main\b/g, 'class LessonMain');
    const web = ['web', 'validation', 'security', 'securityjwt', 'test', 'actuator'].includes(module);
    const route = sampleRoute(original);
    const requestPath = route.route;
    const main = web
      ? `\n@SpringBootApplication(scanBasePackages = "${packageName}")\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        try (var context = SpringApplication.run(Main.class, "--server.port=0")) {\n            Integer port = context.getEnvironment().getProperty("local.server.port", Integer.class);\n            var request = java.net.http.HttpRequest.newBuilder(java.net.URI.create("http://127.0.0.1:" + port + ${JSON.stringify(requestPath)})).method(${JSON.stringify(route.verb)}, java.net.http.HttpRequest.BodyPublishers.noBody()).build();\n            var response = java.net.http.HttpClient.newHttpClient().send(request, java.net.http.HttpResponse.BodyHandlers.ofString());\n            System.out.println(${JSON.stringify(route.verb + ' ' + requestPath + ' -> HTTP ')} + response.statusCode());\n            System.out.println(response.body());\n        }\n    }\n}\n`
      : `\n@SpringBootApplication(scanBasePackages = "${packageName}")\npublic class Main {\n    @Bean CommandLineRunner lessonLab() {\n        return args -> System.out.println("Spring Boot context started; lesson snippet loaded.");\n    }\n    public static void main(String[] args) { SpringApplication.run(Main.class, args); }\n}\n`;
    return { packageName, mainClass: 'Main', code: 'package ' + packageName + ';\n' + imports + code + main };
  }
  if (/\bstatic\s+void\s+main\s*\(/.test(original)) {
    const mainType = original.match(/\bpublic\s+class\s+([A-Za-z_$][\w$]*)\b/);
    const mainClass = mainType ? mainType[1] : 'Main';
    return { code: (course === 'springboot' ? 'package ' + packageName + ';\n' : '') + imports + original, packageName, mainClass };
  }
  source = original.replace(/^\s*public\s+(?=(?:class|record|enum|interface)\b)/gm, '')
    .replace(/^\s*@SpringBootApplication\s*$/gm, '')
    .replace(/\bclass\s+Main\b/g, 'class LessonMain');
  if (course === 'springboot') return { packageName, mainClass: 'Main', code: 'package ' + packageName + ';\n' + imports + source };
  const route = sampleRoute(source);
  return { packageName: 'javatrail.lab', mainClass: 'Main', code: 'package javatrail.lab;\n' + imports + source + `\n\n@Configuration\n@ComponentScan(basePackages = "javatrail.lab")\n@EnableWebMvc\n@EnableAspectJAutoProxy\n@EnableTransactionManagement\n@EnableScheduling\nclass LabConfiguration {\n    @Bean DataSource dataSource() {\n        DriverManagerDataSource ds = new DriverManagerDataSource();\n        ds.setDriverClassName("org.h2.Driver");\n        ds.setUrl("jdbc:h2:mem:javatrail;DB_CLOSE_DELAY=-1");\n        return ds;\n    }\n    @Bean JdbcTemplate jdbcTemplate(DataSource dataSource) { return new JdbcTemplate(dataSource); }\n    @Bean PlatformTransactionManager transactionManager(DataSource dataSource) { return new DataSourceTransactionManager(dataSource); }\n}\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        try (var context = new AnnotationConfigWebApplicationContext()) {\n            context.setServletContext(new MockServletContext());\n            context.register(LabConfiguration.class);\n            context.refresh();\n            var builder = MockMvcBuilders.webAppContextSetup(context);
            var securityFilter = context.getBeanProvider(org.springframework.security.web.FilterChainProxy.class).getIfAvailable();
            if (securityFilter != null) builder.addFilters(securityFilter);
            var mvc = builder.build();\n            var response = mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.${route.verb.toLowerCase()}(${JSON.stringify(route.route)})).andReturn().getResponse();\n            System.out.println("${route.verb} " + ${JSON.stringify(route.route)} + " -> HTTP " + response.getStatus());\n            System.out.println(response.getContentAsString());\n        }\n    }\n}\n` };
}

async function executeSpringProject(course, module, code, mode) {
  if (course !== 'spring' && course !== 'springboot') return { phase: 'input', ok: false, stderr: 'Unknown Spring lab.' };
  const wrapped = mode === 'snippet' ? makeSpringSnippet(course, module, code) : (() => {
    const packageMatch = code.match(/^\s*package\s+([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\s*;/m);
    const packageName = packageMatch ? packageMatch[1] : 'javatrail.lab';
    if (!packageMatch) code = 'package javatrail.lab;\n' + code;
    // The source file must be named after the public class, which is also the class that holds main().
    const mainType = code.match(/\bpublic\s+(?:final\s+)?class\s+([A-Za-z_$][\w$]*)/) || code.match(/\bclass\s+([A-Za-z_$][\w$]*)[^{]*\{(?:(?!\bclass\s)[\s\S])*?\bstatic\s+void\s+main\s*\(/);
    return { code, packageName, mainClass: mainType ? mainType[1] : 'Main' };
  })();
  code = wrapped.code;
  const packageName = wrapped.packageName;
  const maven = findMaven();
  if (!maven) return { phase: 'input', ok: false, stderr: 'Maven was not found on PATH. Install Maven or add its bin folder to PATH, then restart JavaTrail.' };
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'javatrail-spring-'));
  const srcDir = path.join(dir, 'src', 'main', 'java', ...packageName.split('.'));
  try {
    await fsp.mkdir(srcDir, { recursive: true });
    await Promise.all([
      fsp.writeFile(path.join(dir, 'pom.xml'), springPom(course, module), 'utf8'),
      fsp.writeFile(path.join(srcDir, wrapped.mainClass + '.java'), code, 'utf8'),
    ]);
    const env = { ...process.env, JAVA_HOME: JDK.home, MAVEN_OPTS: '-Xmx768m -Dfile.encoding=UTF-8', PATH: path.join(JDK.home, 'bin') + path.delimiter + path.dirname(maven) + path.delimiter + process.env.PATH };
    const mainClass = packageName + '.' + wrapped.mainClass;
    const args = ['-B', '-ntp', '-f', 'pom.xml', 'compile', 'exec:java', '-Dexec.mainClass=' + mainClass];
    const command = process.platform === 'win32'
      ? { file: process.env.ComSpec || 'cmd.exe', args: ['/d', '/s', '/c', 'mvn.cmd ' + args.join(' ')], shell: false }
      : { file: maven, args, shell: false };
    const result = await run(command.file, command.args, { cwd: dir, timeout: SPRING_TIMEOUT_MS, env, shell: command.shell });
    return {
      phase: result.code === 0 ? 'run' : result.timedOut ? 'timeout' : 'build',
      ok: result.code === 0 && !result.timedOut,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.code,
      timedOut: result.timedOut,
      truncated: result.truncated,
      ms: result.ms,
    };
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

async function handleRun(req, res, execute = executeJava) {
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
    sendJson(res, 200, await execute(code, stdin));
  } catch (err) {
    sendJson(res, 500, { error: 'Runner failure: ' + err.message });
  } finally {
    active--;
  }
}

async function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath);
  // Lesson routes (/java, /java-core-advanced, /spring) and Try It use the client shell.
  if (rel === '/' ) { res.writeHead(302, { Location: '/java/' }); return res.end(); }
  if (rel === '/java' || rel.startsWith('/java/')) rel = '/index.html';
  if (rel === '/java-core-advanced' || rel.startsWith('/java-core-advanced/')) rel = '/index.html';
  if (rel === '/spring' || rel.startsWith('/spring/')) rel = '/index.html';
  if (rel === '/spring-boot' || rel.startsWith('/spring-boot/')) rel = '/index.html';
  if (rel === '/security' || rel.startsWith('/security/')) rel = '/index.html';
  if (rel === '/ruby' || rel.startsWith('/ruby/')) rel = '/index.html';
  if (rel === '/rails' || rel.startsWith('/rails/')) rel = '/index.html';
  for (const area of ['major-gems', 'coding-interview', 'rails-scenarios']) {
    if (rel === '/' + area || rel.startsWith('/' + area + '/')) rel = '/index.html';
  }
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
  if (url.pathname === '/api/ruby/run') {
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST.' });
    return handleRun(req, res, executeRuby);
  }
  if (url.pathname === '/api/spring/run') {
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST.' });
    const origin = req.headers.origin;
    if (origin && origin !== `http://${req.headers.host}`) return sendJson(res, 403, { error: 'Cross-origin requests are not allowed.' });
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) return sendJson(res, 415, { error: 'Expected application/json.' });
    if (activeSpring >= 1) return sendJson(res, 429, { error: 'The Spring lab is busy. Wait for the current Maven build to finish.' });
    activeSpring++;
    (async () => {
      try {
        const raw = await readBody(req, MAX_CODE + 1024);
        const payload = JSON.parse(raw);
        const code = typeof payload.code === 'string' ? payload.code : '';
        if (!code.trim()) return sendJson(res, 400, { error: 'No code submitted.' });
        if (code.length > MAX_CODE) return sendJson(res, 413, { error: 'Code is too long.' });
        const course = payload.course;
        const module = typeof payload.module === 'string' ? payload.module : 'core';
        const mode = payload.mode === 'snippet' ? 'snippet' : 'program';
        const result = await executeSpringProject(course, module, code, mode);
        sendJson(res, 200, result);
      } catch {
        sendJson(res, 400, { error: 'Invalid or oversized Spring lab request.' });
      } finally {
        activeSpring--;
      }
    })();
    return;
  }
  if (url.pathname === '/api/health') return sendJson(res, 200, { ok: true, jdk: JDK.home, version: JDK.version, ruby: RUBY ? RUBY.home : null });
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  serveStatic(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`JavaTrail running at http://${HOST}:${PORT}/java/`);
  console.log(`Using JDK: ${JDK.home}`);
  console.log(`Using Ruby: ${RUBY ? RUBY.home : 'not found (Ruby lessons cannot run)'}`);
});
