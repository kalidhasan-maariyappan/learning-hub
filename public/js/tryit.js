// Try-it page: loads an example by ?page=<slug>&ex=<index>, edits it, and runs it on the local JDK or Ruby.
(function () {
  'use strict';
  const JT = window.JT;
  const params = new URLSearchParams(location.search);
  const slug = params.get('page') || '';
  const idx = Number(params.get('ex') || 0);
  const { examples } = JT.renderBody(slug);
  const ex = examples[idx];
  const fallback = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}\n';
  const code = ex ? ex.run : fallback;
  const lang = ex ? ex.lang : 'java';

  const titleEl = document.getElementById('tryit-title');
  if (ex) titleEl.textContent = (JT.navInfo[slug] ? JT.navInfo[slug].fullTitle : slug) + ' — example ' + (idx + 1);
  else if (slug) titleEl.textContent = 'Example not found — showing a starter program';
  if (lang === 'ruby') {
    document.getElementById('stdin').placeholder = 'Text typed here is sent to $stdin (gets) when the program runs.';
    document.getElementById('console').innerHTML = '<span class="sys">Press Run to execute the code with the local Ruby.</span>';
  }
  if (ex && ex.stdin) { document.getElementById('stdin').value = ex.stdin; document.querySelector('details.stdin').open = true; }

  const consoleEl = document.getElementById('console');
  const runBtn = document.getElementById('run-btn');
  const editor = JT.createEditor(document.getElementById('editor'), code, { onRun: run, lang });

  async function run() {
    runBtn.disabled = true;
    consoleEl.innerHTML = '<span class="sys">' + (lang === 'ruby' ? 'Running…' : 'Compiling and running…') + '</span>';
    const r = await JT.runCode(lang, editor.value, document.getElementById('stdin').value);
    runBtn.disabled = false;
    JT.showResult(consoleEl, r);
  }
  runBtn.addEventListener('click', run);
  document.getElementById('theme-btn').addEventListener('click', JT.toggleTheme);

  // Orientation + draggable splitter (observed behaviour on the reference try-it page).
  const panes = document.getElementById('panes');
  const codePane = document.getElementById('code-pane');
  const readout = document.getElementById('size-readout');
  const vertical = () => panes.classList.contains('vertical') || matchMedia('(max-width: 760px)').matches;
  const showSize = () => { const r = document.getElementById('result-pane').getBoundingClientRect(); readout.textContent = 'Result size: ' + Math.round(r.width) + ' x ' + Math.round(r.height); };
  document.getElementById('orient-btn').addEventListener('click', () => { panes.classList.toggle('vertical'); codePane.style.flex = ''; showSize(); });
  const splitter = document.getElementById('splitter');
  splitter.addEventListener('pointerdown', (e) => {
    splitter.setPointerCapture(e.pointerId);
    const move = (ev) => {
      const r = panes.getBoundingClientRect();
      const frac = vertical() ? (ev.clientY - r.top) / r.height : (ev.clientX - r.left) / r.width;
      codePane.style.flex = '0 0 ' + Math.min(90, Math.max(10, frac * 100)) + '%';
      showSize();
    };
    const up = () => { splitter.removeEventListener('pointermove', move); splitter.removeEventListener('pointerup', up); };
    splitter.addEventListener('pointermove', move);
    splitter.addEventListener('pointerup', up);
  });
  window.addEventListener('resize', showSize);
  showSize();
  if (ex) run();
})();
