(() => {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
  const base = new URL('../', document.currentScript.src);
  const panel = document.createElement('aside');
  panel.className = 'pwa-panel';
  panel.setAttribute('aria-label', 'App availability');
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  const install = document.createElement('button');
  install.textContent = 'Install app'; install.hidden = true;
  const update = document.createElement('button');
  update.textContent = 'Update app'; update.hidden = true;
  panel.append(status, install, update); document.body.append(panel);
  let ready = false, prompt, waiting;
  function refresh() {
    status.textContent = !navigator.onLine
      ? (ready ? 'Offline · Lessons available. Running code needs the local server.' : 'Offline · Open online once to save lessons.')
      : (ready ? 'Lessons ready offline' : 'Saving lessons for offline use…');
  }
  refresh();
  addEventListener('online', refresh); addEventListener('offline', refresh);
  addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); prompt = event; install.hidden = false;
  });
  install.addEventListener('click', async () => {
    if (!prompt) return;
    await prompt.prompt(); await prompt.userChoice; prompt = null; install.hidden = true;
  });
  addEventListener('appinstalled', () => {install.hidden = true; prompt = null;});
  update.addEventListener('click', () => {
    if (waiting) { updating = true; waiting.postMessage('ACTIVATE_UPDATE'); }
  });
  let updating = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {if (updating) location.reload();});
  navigator.serviceWorker.register(new URL('sw.js', base), {scope:base.pathname, updateViaCache:'none'}).then(registration => {
    function offerUpdate() {
      if (registration.waiting && navigator.serviceWorker.controller) {
        waiting = registration.waiting; update.hidden = false;
      }
    }
    offerUpdate();
    registration.addEventListener('updatefound', () => {
      registration.installing?.addEventListener('statechange', offerUpdate);
    });
    return navigator.serviceWorker.ready;
  }).then(() => { ready = true; refresh(); }).catch(() => {
    status.textContent = 'Offline saving unavailable. Try reloading online.';
  });
})();
