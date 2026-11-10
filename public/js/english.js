/* English learning: short meanings, formulas and bilingual examples. */
(function () {
  'use strict';
  const JT = window.JT;
  const D = JT.englishData;
  const esc = JT.esc;
  const base = () => oldUrl('english_home').replace(/\/$/, '');
  const url = l => base() + '/' + l.level + '/' + l.category + '/' + l.id;
  const categoryInfo = key => D.categories.find(c => c[0] === key);
  const lexicalCategories = new Set(D.lexicalCategories);
  // Choose the earliest introduction when several senses share a headword.
  const firstWords = new Map();
  for (const l of D.lessons) if (l.lexicalKey) {
    const prev = firstWords.get(l.lexicalKey);
    if (!prev || D.levels.indexOf(l.level) < D.levels.indexOf(prev.level)) firstWords.set(l.lexicalKey, l);
  }
  const wordsAtLevel = level => [...firstWords.values()].filter(l => D.levels.indexOf(l.level) <= D.levels.indexOf(level));
  function vocabularySummary(level) {
    const learned = new Set(D.lessons.filter(l => l.lexicalKey && completed(l)).map(l => l.lexicalKey));
    return '<div class="en-vocab-summary" aria-label="Vocabulary coverage">' + D.vocabulary.levels.map(v => {
      const words = wordsAtLevel(v.level);
      const done = words.filter(l => learned.has(l.lexicalKey)).length;
      return '<a href="' + base() + '/' + v.level + '/vocabulary"' + (level === v.level ? ' class="selected"' : '') + '><span>' + v.level + '</span><strong>' + v.cumulative.toLocaleString('en-IN') + '</strong><small>' + done + ' learned</small></a>';
    }).join('') + '</div>';
  }
  const object = x => x && typeof x === 'object' && !Array.isArray(x) ? x : {};
  function read() {
    try {
      const s = object(JSON.parse(localStorage.getItem('jt-english-v1')));
      return { level: s.level, completed: object(s.completed), attempts: object(s.attempts), notes: object(s.notes) };
    } catch { return { completed: {}, attempts: {}, notes: {} }; }
  }
  const state = read();
  let storageOK = true;
  let removeVoiceListener = () => {};
  function save() {
    try { localStorage.setItem('jt-english-v1', JSON.stringify(state)); }
    catch { storageOK = false; }
    const message = document.querySelector('.en-storage');
    if (message && !storageOK) message.textContent = 'Storage unavailable. Changes last only in this session. / சேமிப்பு கிடைக்கவில்லை.';
  }
  const pair = (en, ta) => '<div class="en-pair"><p lang="ta">' + esc(ta) + '</p><p lang="en">' + esc(en) + '</p></div>';
  const completed = l => !!state.completed[l.id];
  const status = l => completed(l) ? '✓ Completed' : attemptFor(l) ? '◷ Practised' : 'Open →';
  function go(path) { history.pushState({}, '', path); JT.render('english_home'); }
  function inCategory(l, category) {
    return category === 'overview' || category === 'exercises' || category === 'conditionals' && (D.conditionalIds || []).includes(l.id) || category === 'vocabulary' && lexicalCategories.has(l.category) || l.category === category ||
      category === 'irregular-verbs' && l.category === 'verbs' && l.irregular;
  }
  function card(l) {
    return '<a class="en-card" href="' + url(l) + '"><span class="en-eyebrow">' + l.level + ' · ' + esc(categoryInfo(l.category)[1]) + (l.practiceOnly ? ' · Practice' : '') +
      '</span><h3>' + esc(l.title) + '</h3><p lang="ta">' + esc(l.ta) + '</p><span class="en-status">' + status(l) + '</span></a>';
  }
  function progress(list) {
    const n = list.filter(completed).length;
    return '<div class="en-progress"><span>' + n + ' / ' + list.length + ' completed · ' +
      (list.length ? Math.round(n / list.length * 100) : 0) + '%</span><progress value="' + n + '" max="' + (list.length || 1) + '">' + n + '</progress></div>';
  }
  function attemptFor(l) {
    const attempt = state.attempts[l.id];
    return attempt && (!l.quizKey || attempt.quizKey === l.quizKey) ? attempt : null;
  }
  function quiz(l) {
    const attempt = attemptFor(l);
    return '<details class="en-practice" id="practice"><summary>Practice / பயிற்சி (' + l.practice.length + ')</summary><form id="en-quiz">' +
      l.practice.map((q, i) => '<fieldset><legend>' + (i + 1) + '. ' + esc(q[0]) + '</legend><p lang="ta">' + esc(q[1]) + '</p>' +
        q[2].map((option, j) => '<label class="en-option"><input type="radio" required name="q' + i + '" value="' + j + '" ' +
          (attempt?.answers?.[i] === j ? 'checked' : '') + '> ' + esc(option) + '</label>').join('') +
        '<div id="en-feedback-' + i + '" aria-live="polite"></div></fieldset>').join('') +
      '<button class="btn" type="submit">Check answers</button> <button class="btn ghost" type="reset">Try again</button>' +
      '<p id="en-score" role="status">' + (attempt ? attempt.score + ' / ' + attempt.total + ' correct' : '') + '</p></form></details>';
  }
  const wordCount = text => String(text).trim().split(/\s+/).filter(Boolean).length;
  function taskMarkup(l) {
    return '<div class="en-task"><h3>Your task / உங்கள் பயிற்சி</h3>' + (l.speakingSeconds ? '<p class="small">Speak for ' + l.speakingSeconds[0] + '–' + l.speakingSeconds[1] + ' seconds. / இவ்வளவு நேரம் பேச முயலுங்கள்.</p>' : '') +
      '<ul>' + l.prompts.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul></div>';
  }
  function notes(l) {
    const draft = String(state.notes[l.id] || '');
    const target = l.wordTarget ? ' · target ' + l.wordTarget[0] + '–' + l.wordTarget[1] : '';
    return '<details class="en-practice"' + (l.category === 'writing' ? ' open' : '') + '><summary>' + (l.category === 'speaking' ? 'Practice notes / பயிற்சிக் குறிப்புகள்' : 'Write your own / எழுதிப் பாருங்கள்') + '</summary>' +
      (!l.richContent || !['writing','speaking'].includes(l.category) ? '<ul>' + l.prompts.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' : '') +
      '<label for="en-notes">Your answer / உங்கள் பதில்' + (l.wordTarget ? ' · ' + l.wordTarget[0] + '–' + l.wordTarget[1] + ' words' : '') + '</label>' +
      '<textarea id="en-notes" rows="' + (l.category === 'writing' ? 8 : 4) + '" placeholder="Write here… / இங்கே எழுதுங்கள்…">' + esc(draft) + '</textarea>' +
      '<output id="en-word-count" class="small" aria-live="polite">' + wordCount(draft) + ' words' + target + '</output>' +
      (l.checklist?.length ? '<h3>Self-check / சுய சரிபார்ப்பு</h3><ul>' + l.checklist.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '') +
      '<p class="small">Saved here. Speaking and writing are self-review tasks; they are not automatically graded.</p></details>';
  }
  function audioControls(l) {
    const rate = l.level === 'B2' ? 1 : 0.9;
    return '<div class="en-audio-controls"><button class="btn" id="en-listen" disabled>Loading voice…</button><button class="btn ghost" id="en-listen-stop" disabled>Stop</button><label for="en-listen-rate">Speed <select id="en-listen-rate">' +
      [[0.75,'Slow'],[0.9,'Steady'],[1,'Normal'],[1.1,'Faster']].map(([n,label]) => '<option value="' + n + '"' + (n === rate ? ' selected' : '') + '>' + label + '</option>').join('') +
      '</select></label></div><p id="en-audio-status" class="small" role="status">Uses an English voice supplied by your browser.</p>';
  }
  function passage(l) {
    return '<article class="en-passage" lang="en">' + l.examples.map(x => '<p>' + esc(x[0]) + '</p>').join('') + '</article>' +
      '<details class="en-practice en-translation"><summary>Tamil translation / தமிழ் பொருள்</summary><div lang="ta">' + l.examples.map(x => '<p>' + esc(x[1]) + '</p>').join('') + '</div></details>';
  }
  function exampleMarkup(l) {
    const examples = '<div class="en-examples">' + l.examples.map((x, i) => '<article><div>' +
      (l.exampleLabels ? '<span class="en-example-label">' + esc(l.exampleLabels[i] || 'In context') + '</span>' : '') + pair(x[0], x[1]) + '</div></article>').join('') + '</div>';
    if (l.category === 'listening') return audioControls(l) + '<details class="en-practice"><summary>Transcript / உரை</summary>' + (l.richContent ? passage(l) : examples) + '</details>';
    if (l.richContent && l.category === 'reading') return passage(l);
    if (l.richContent && l.category === 'conversations') return '<ol class="en-dialogue">' + l.examples.map(x => '<li><p lang="en">' + esc(x[0]) + '</p><p lang="ta">' + esc(x[1]) + '</p></li>').join('') + '</ol>';
    if (l.richContent && ['speaking','writing'].includes(l.category)) return taskMarkup(l) +
      '<details class="en-practice en-model"' + (l.category === 'writing' ? ' open' : '') + '><summary>Model answer / மாதிரி பதில்</summary>' + passage(l) + '</details>';
    return (l.category === 'pronunciation' ? audioControls(l) : '') + examples;
  }
  function wireAudio(main, l) {
    const button = main.querySelector('#en-listen');
    if (!button) return;
    const message = main.querySelector('#en-audio-status');
    const speed = main.querySelector('#en-listen-rate');
    const stop = main.querySelector('#en-listen-stop');
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      button.textContent = 'Voice unavailable'; speed.disabled = true;
      message.textContent = 'Use the transcript. / உரையைப் படிக்கவும்.';
      return;
    }
    const synth = window.speechSynthesis;
    const update = () => {
      const voices = synth.getVoices().filter(v => /^en[-_]/i.test(v.lang));
      button.disabled = !voices.length; speed.disabled = !voices.length;
      button.textContent = voices.length ? '▶ Listen' : 'English voice unavailable';
      message.textContent = voices.length ? 'Browser voice · ' + voices[0].name : 'No English voice is available. Use the transcript. / உரையைப் படிக்கவும்.';
    };
    update();
    synth.addEventListener('voiceschanged', update);
    removeVoiceListener = () => synth.removeEventListener('voiceschanged', update);
    let playback = 0;
    button.onclick = () => {
      const currentPlayback = ++playback;
      const voices = synth.getVoices().filter(v => /^en[-_]/i.test(v.lang));
      if (!voices.length) { update(); return; }
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(l.examples.map(x => x[0]).join(' ').replace(/\s\/\s/g, ', '));
      utterance.voice = voices.find(v => /^en[-_]IN$/i.test(v.lang)) || voices[0];
      utterance.lang = utterance.voice.lang;
      utterance.rate = Number(speed.value);
      utterance.onstart = () => { if (currentPlayback !== playback) return; message.textContent = 'Playing… / ஒலிக்கிறது…'; stop.disabled = false; };
      utterance.onend = () => { if (currentPlayback !== playback) return; message.textContent = 'Finished. Listen again if needed. / மீண்டும் கேட்கலாம்.'; stop.disabled = true; };
      utterance.onerror = () => { if (currentPlayback !== playback) return; message.textContent = 'Playback unavailable. Use the transcript. / உரையைப் படிக்கவும்.'; stop.disabled = true; };
      synth.speak(utterance);
    };
    stop.onclick = () => { playback++; synth.cancel(); stop.disabled = true; message.textContent = 'Stopped. / நிறுத்தப்பட்டது.'; };
  }
  const PAGE_SIZES = [12, 24, 36, 60];
  function pagerMarkup(id) {
    return '<div class="en-page-settings"><span id="' + id + '-range" role="status"></span><label for="' + id + '-size">Per page <select id="' + id + '-size">' +
      PAGE_SIZES.map(n => '<option value="' + n + '">' + n + '</option>').join('') + '</select></label></div><div id="' + id + '-items" class="en-grid"></div>' +
      '<nav id="' + id + '-nav" class="en-pagination" aria-label="Lesson pages"></nav>';
  }
  function wirePager(main, id, items, search, emptyText) {
    const params = new URLSearchParams(location.search);
    let page = Math.max(1, Math.floor(Number(params.get('page'))) || 1);
    let size = PAGE_SIZES.includes(Number(params.get('perPage'))) ? Number(params.get('perPage')) : 36;
    if (search) search.value = params.get('q') || '';
    const sizeSelect = main.querySelector('#' + id + '-size');
    sizeSelect.value = String(size);
    const grid = main.querySelector('#' + id + '-items');
    const nav = main.querySelector('#' + id + '-nav');
    function updateURL(push) {
      const target = new URL(location.href);
      target.searchParams.delete('page'); target.searchParams.delete('perPage'); target.searchParams.delete('q');
      if (page > 1) target.searchParams.set('page', page);
      if (size !== 36) target.searchParams.set('perPage', size);
      if (search?.value.trim()) target.searchParams.set('q', search.value.trim());
      if (target.href !== location.href) history[push ? 'pushState' : 'replaceState']({}, '', target.pathname + target.search + target.hash);
    }
    function paint() {
      const q = search?.value.trim().toLocaleLowerCase() || '';
      const hits = q ? items.filter(l => [l.title, l.ta, l.why, l.rule, ...(l.forms || []), ...l.examples.flat()].join(' ').toLocaleLowerCase().includes(q)) : items;
      const pages = Math.max(1, Math.ceil(hits.length / size));
      page = Math.min(page, pages);
      updateURL(false);
      const start = (page - 1) * size;
      grid.innerHTML = hits.length ? hits.slice(start, start + size).map(card).join('') : '<p>' + emptyText + '</p>';
      const count = main.querySelector('#en-result-count');
      if (count) count.textContent = hits.length + ' lessons';
      main.querySelector('#' + id + '-range').textContent = hits.length ? (start + 1).toLocaleString('en-IN') + '–' + Math.min(start + size, hits.length).toLocaleString('en-IN') + ' of ' + hits.length.toLocaleString('en-IN') : '0 lessons';
      if (pages === 1) { nav.innerHTML = ''; nav.hidden = true; return; }
      nav.hidden = false;
      const button = (n, label, disabled, current = false) => '<button type="button" data-page="' + n + '"' + (disabled ? ' disabled' : '') +
        (current ? ' aria-current="page"' : '') + ' aria-label="' + (label === 'Previous' || label === 'Next' ? label + ' page' : 'Page ' + n) + '">' + label + '</button>';
      const numbers = [...new Set([1, pages, page - 1, page, page + 1].filter(n => n >= 1 && n <= pages))].sort((a, b) => a - b);
      let previous = 0;
      const links = numbers.map(n => { const gap = previous && n - previous > 1 ? '<span class="en-page-gap" aria-hidden="true">…</span>' : ''; previous = n; return gap + button(n, n, false, n === page); }).join('');
      nav.innerHTML = '<div class="en-page-buttons">' + button(page - 1, 'Previous', page === 1) + '<div class="en-page-numbers">' + links + '</div>' + button(page + 1, 'Next', page === pages) + '</div>' +
        '<label class="en-page-jump">Go to page <select aria-label="Go to page">' + Array.from({length: pages}, (_, i) => '<option value="' + (i + 1) + '"' + (page === i + 1 ? ' selected' : '') + '>' + (i + 1) + '</option>').join('') + '</select><span>of ' + pages + '</span></label>';
      nav.querySelectorAll('button[data-page]').forEach(button => { button.onclick = () => changePage(Number(button.dataset.page)); });
      nav.querySelector('select').onchange = e => changePage(Number(e.target.value));
    }
    function changePage(next) {
      page = next; updateURL(true); paint();
      const range = main.querySelector('#' + id + '-range');
      range.tabIndex = -1; range.focus({preventScroll: true});
      range.scrollIntoView({block: 'start'});
    }
    sizeSelect.onchange = () => { size = Number(sizeSelect.value); page = 1; updateURL(true); paint(); };
    if (search) search.oninput = () => { page = 1; paint(); };
    paint();
  }

  function render(keepScroll) {
    removeVoiceListener(); removeVoiceListener = () => {};
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const parts = location.pathname.slice(base().length).split('/').filter(Boolean);
    const isProgress = parts[0] === 'progress';
    const level = D.levels.includes(parts[0]) ? parts[0] : D.levels.includes(state.level) ? state.level : 'A1';
    state.level = level; save();
    const category = categoryInfo(parts[1]) ? parts[1] : 'overview';
    const lesson = D.lessons.find(l => l.level === level && l.category === category && l.id === parts[2]);
    const list = D.lessons.filter(l => l.level === level);
    const filtered = category === 'vocabulary' ? wordsAtLevel(level) : list.filter(l => inCategory(l, category)).sort((a,b) => Number(!!b.practiceOnly) - Number(!!a.practiceOnly));
    const countCategory = cat => cat === 'vocabulary' ? wordsAtLevel(level).length : list.filter(l => inCategory(l, cat)).length;
    const side = document.getElementById('sidebar');
    const main = document.getElementById('main');
    side.setAttribute('aria-label', 'English learning navigation');
    side.innerHTML = '<div class="en-side-head"><h2>English <span lang="ta">ஆங்கிலம்</span></h2><label for="en-level">Level / நிலை</label><select id="en-level">' +
      D.levels.map((v, i) => '<option ' + (v === level ? 'selected' : '') + ' value="' + v + '">' + v + ' · ' + D.names[i] + '</option>').join('') + '</select>' + progress(list) +
      '</div><nav aria-label="English categories">' + D.categories.map(c => '<a href="' + base() + '/' + level + '/' + (c[0] === 'overview' ? '' : c[0]) + '" ' +
        (category === c[0] && !isProgress ? 'class="active" aria-current="page"' : '') + '>' + esc(c[1]) + '<small>' + countCategory(c[0]) + '</small></a>').join('') +
      '</nav><a href="' + base() + '/progress">Progress & review</a>';
    side.querySelector('select').onchange = e => go(base() + '/' + e.target.value + '/' + (category === 'overview' ? '' : category));
    document.getElementById('menu-btn').setAttribute('aria-label', 'Toggle English learning menu');
    document.title = (lesson ? lesson.title : isProgress ? 'English progress' : level + ' English Learning') + ' · JavaTrail';
    let html;
    let reviewItems = null;
    if (parts.length > 2 && !lesson) {
      html = '<h1>Lesson not found</h1><a href="' + base() + '/' + level + '">Back to lessons</a>';
    } else if (isProgress) {
      const due = D.lessons.filter(l => state.attempts[l.id]?.score < state.attempts[l.id]?.total ||
        state.completed[l.id] && Date.now() - state.completed[l.id] > 86400000);
      reviewItems = due;
      html = '<h1>Your progress / முன்னேற்றம்</h1><h2>Vocabulary / சொற்களஞ்சியம்</h2>' + vocabularySummary(level) + '<h2>All lessons / பாடங்கள்</h2>' + progress(D.lessons) + '<div class="en-grid">' + D.levels.map(v => '<section class="en-panel"><h2>' + v + '</h2>' +
        progress(D.lessons.filter(l => l.level === v)) + '<a href="' + base() + '/' + v + '">Continue →</a></section>').join('') + '</div><h2>Review / மறுபயிற்சி</h2>' +
        '<p class="small">Mistakes and lessons completed over a day ago.</p>' + pagerMarkup('en-review') +
        '<details class="en-panel"><summary>Lesson counts / பாட எண்ணிக்கை</summary><div class="table-wrap"><table class="ref"><thead><tr><th>Category</th>' +
        D.levels.map(v => '<th>' + v + '</th>').join('') + '</tr></thead><tbody>' + D.categories.filter(c => !['overview', 'exercises'].includes(c[0])).map(c =>
          '<tr><th scope="row">' + esc(c[1]) + '</th>' + D.levels.map(v => '<td>' + (c[0] === 'vocabulary' ? wordsAtLevel(v).length : D.lessons.filter(l => l.level === v && inCategory(l, c[0])).length) + '</td>').join('') + '</tr>').join('') +
        '</tbody></table></div><p class="small">Vocabulary and irregular-verb views reuse entries. Total: ' + D.lessons.length + ' unique lessons.</p></details>';
    } else if (lesson) {
      const l = lesson;
      const siblings = list.filter(x => x.category === l.category);
      const index = siblings.indexOf(l);
      html = '<a class="en-back" href="' + base() + '/' + level + '/' + category + '">← ' + level + ' / ' + esc(categoryInfo(category)[1]) + '</a>' +
        '<header class="en-short-head"><span class="en-eyebrow">' + level + (l.partOfSpeech ? ' · ' + esc({n:'Noun',v:'Verb',adj:'Adjective',adv:'Adverb',phrv:'Phrasal verb',phrase:'Expression',prep:'Preposition',pron:'Pronoun',conj:'Connector',det:'Determiner',num:'Number',modal:'Modal',interj:'Expression'}[l.partOfSpeech] || l.partOfSpeech) : '') + '</span><h1>' + esc(l.title) + '</h1></header>' +
        '<section class="en-meaning"><p><span class="en-label">' + (l.richContent ? 'பயிற்சி' : 'தமிழ் பொருள்') + '</span><span lang="ta">' + esc(l.ta) + '</span></p>' +
        '<p><span class="en-label">' + (l.richContent ? 'Focus' : 'English meaning') + '</span>' + esc(l.why) + '</p></section>' +
        (l.rule && l.rule !== l.title ? '<section class="en-rule"><span class="en-eyebrow">' + (l.richContent && ['reading','writing','speaking','listening','conversations','pronunciation'].includes(l.category) ? 'QUICK GUIDE / குறிப்பு' : 'FORMULA / அமைப்பு') + '</span><p>' + esc(l.rule) + '</p></section>' : '') +
        (l.forms ? '<div class="en-forms">' + l.forms.map((f, i) => '<div><small>V' + (i + 1) + '</small><strong>' + esc(f) + '</strong></div>').join('') + '</div>' : '') +
        '<section class="en-short-examples"><h2>' + (l.category === 'reading' ? 'Read / படியுங்கள்' : l.category === 'conversations' ? 'Conversation / உரையாடல்' : l.category === 'listening' ? 'Listen / கேளுங்கள்' : l.category === 'speaking' ? 'Speaking task / பேசுதல்' : l.category === 'writing' ? 'Writing task / எழுதுதல்' : 'Examples / உதாரணங்கள்') + '</h2>' + exampleMarkup(l) + '</section>' +
        (l.relatedPractice?.length ? '<aside class="en-context-links"><h3>Practise in context / வாக்கியங்களில் பயிற்சி</h3>' + l.relatedPractice.map(id => { const next = D.lessons.find(x => x.id === id); return '<a href="' + url(next) + '">' + next.level + ' · ' + esc(next.title) + ' →</a>'; }).join('') + '</aside>' : '') + quiz(l) + notes(l) + '<button class="btn" id="en-complete">' + (completed(l) ? '✓ Completed · mark unfinished' : 'Mark complete ✓') + '</button>' +
        '<div class="en-prevnext">' + (index > 0 ? '<a href="' + url(siblings[index - 1]) + '">← Previous</a>' : '<span></span>') +
        (index < siblings.length - 1 ? '<a href="' + url(siblings[index + 1]) + '">Next →</a>' : '<a href="' + base() + '/' + level + '/' + category + '">All ' + esc(categoryInfo(category)[1]) + ' →</a>') + '</div>';
    } else {
      const cat = categoryInfo(category);
      html = '<header class="en-short-head"><span class="en-eyebrow">' + level + ' · TAMIL → ENGLISH</span><h1>' +
        (category === 'overview' ? 'Learn English' : esc(cat[1])) + '</h1><p lang="ta">' +
        (category === 'overview' ? 'பொருள். அமைப்பு. எளிய உதாரணம்.' : esc(cat[2])) + '</p></header>' +
        vocabularySummary(level) + (category === 'vocabulary' ? '<p class="small">Words &amp; fixed expressions · includes earlier levels. / முந்தைய நிலைகளின் சொற்களும் அடங்கும்.</p>' : '') + '<div class="en-toolbar"><label>Category / வகை<select id="en-category">' + D.categories.map(c => '<option value="' + c[0] + '" ' + (category === c[0] ? 'selected' : '') + '>' + esc(c[1]) + '</option>').join('') +
        '</select></label><label>Search / தேடுங்கள்<input id="en-search" type="search" placeholder="Word, formula or Tamil meaning…"></label></div>' +
        (category === 'overview' ? '<div class="en-category-grid">' + D.categories.filter(c => !['overview', 'exercises'].includes(c[0])).map(c => '<a href="' + base() + '/' + level + '/' + c[0] + '"><strong>' +
          esc(c[1]) + '</strong><span>' + countCategory(c[0]) + ' lessons</span></a>').join('') + '</div>' : '') +
        '<div class="en-list-heading"><h2>' + (category === 'overview' ? 'All lessons' : 'Lessons') + '</h2><span id="en-result-count" role="status">' + filtered.length + ' lessons</span></div>' +
        pagerMarkup('en-topics');
    }
    const contentSource = lesson?.source || lesson?.additionalExampleSource;
    main.innerHTML = '<div class="en-content en-simple">' + html + (contentSource ? '<p class="en-source small">' + (lesson.source ? 'Tamil' : 'Additional Tamil examples') + ': machine-assisted · <a href="' + esc(D.sources[contentSource].url) + '" target="_blank" rel="noopener">English source: ' + esc(D.sources[contentSource].name) + '</a> · <a href="' + base().replace(/\/english-learning$/, '') + '/content/english/SOURCES.md">Credits</a></p>' : '') + '<p class="en-storage" role="status">' +
      (storageOK ? 'Saved in this browser only. / இந்த உலாவியில் மட்டும் சேமிக்கப்படும்.' : 'Storage unavailable. Changes last only in this session. / சேமிப்பு கிடைக்கவில்லை.') + '</p></div>';
    if (lesson) {
      const form = main.querySelector('#en-quiz');
      form.onsubmit = e => {
        e.preventDefault();
        const data = new FormData(form);
        const answers = lesson.practice.map((q, i) => Number(data.get('q' + i)));
        let score = 0;
        lesson.practice.forEach((q, i) => {
          const ok = answers[i] === q[3]; if (ok) score++;
          const feedback = main.querySelector('#en-feedback-' + i);
          feedback.className = 'feedback ' + (ok ? 'ok' : 'bad');
          feedback.textContent = (ok ? '✓ ' : 'Answer: ') + q[2][q[3]] + ' — ' + q[4];
        });
        state.attempts[lesson.id] = { answers, score, total: answers.length, at: Date.now(), quizKey: lesson.quizKey }; save();
        main.querySelector('#en-score').textContent = score + ' / ' + answers.length + ' correct';
      };
      form.onreset = e => {
        e.preventDefault();
        form.querySelectorAll('input[type=radio]').forEach(input => { input.checked = false; });
        lesson.practice.forEach((q, i) => { const fb = main.querySelector('#en-feedback-' + i); fb.textContent = ''; fb.className = ''; });
        main.querySelector('#en-score').textContent = '';
      };
      main.querySelector('#en-notes').oninput = e => { state.notes[lesson.id] = e.target.value; save(); main.querySelector('#en-word-count').textContent = wordCount(e.target.value) + ' words' + (lesson.wordTarget ? ' · target ' + lesson.wordTarget[0] + '–' + lesson.wordTarget[1] : ''); };
      main.querySelector('#en-complete').onclick = () => {
        if (completed(lesson)) delete state.completed[lesson.id]; else state.completed[lesson.id] = Date.now();
        save(); render(true);
      };
      wireAudio(main, lesson);
    }
    const search = main.querySelector('#en-search');
    if (search) {
      wirePager(main, 'en-topics', filtered, search, 'No matching lessons. / பாடங்கள் இல்லை.');
      main.querySelector('#en-category').onchange = e => go(base() + '/' + level + '/' + (e.target.value === 'overview' ? '' : e.target.value));
    }
    if (reviewItems) wirePager(main, 'en-review', reviewItems, null, 'No reviews due. / மறுபயிற்சி எதுவும் இல்லை.');
    if (!keepScroll) window.scrollTo(0, 0);
    document.body.classList.remove('nav-open');
  }
  JT.english = { render };
  JT.englishNav = [];
  JT.englishOrder = [];
  const bySlug = new Map();
  for (const l of D.lessons) {
    const slug = 'english_' + l.id;
    bySlug.set(slug, l); JT.englishOrder.push(slug);
    JT.navInfo[slug] = { title: l.title + ' ' + l.ta, fullTitle: l.title + ' · ' + l.level, group: categoryInfo(l.category)[1] };
  }
  const oldUrl = JT.url;
  JT.url = slug => bySlug.has(slug) ? url(bySlug.get(slug)) : oldUrl(slug);
})();
