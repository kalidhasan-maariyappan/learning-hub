/* Bump this version when publishing changed lessons or assets. */
const VERSION = 'learning-hub-v5';
const BASE = new URL('./', self.location.href);
const CACHE = VERSION + ':' + BASE.pathname;
const local = path => new URL(path, BASE).href;
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const assets = new Set(['index.html', 'tryit.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png']);
    for (const shell of ['index.html', 'tryit.html']) {
      const response = await fetch(local(shell), {cache: 'reload'});
      if (!response.ok) throw new Error('Could not save lessons for offline use');
      const html = await response.text();
      for (const match of html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g)) {
        const url = new URL(match[1], BASE);
        if (url.origin === BASE.origin && url.pathname.startsWith(BASE.pathname)) assets.add(url.href);
      }
    }
    await cache.addAll([...assets].map(path => new Request(local(path), {cache: 'reload'})));
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('learning-hub-') && key.endsWith(':' + BASE.pathname) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data === 'ACTIVATE_UPDATE') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== BASE.origin || !url.pathname.startsWith(BASE.pathname)) return;
  const route = url.pathname.slice(BASE.pathname.length);
  if (route.startsWith('api/')) {
    event.respondWith(fetch(event.request).catch(() => new Response(JSON.stringify({error: 'You are offline. Code execution requires the running local server.'}), {status:503, headers:{'Content-Type':'application/json'}})));
    return;
  }
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    const editor = /^tryit(?:\.html)?\/?$/.test(route);
    const lesson = /^(?:english-learning|java|java-core-advanced|spring|spring-boot|spring-boot-path|spring-boot-crash-course|security|ruby|rails|major-gems|coding-interview|rails-scenarios)(?:\/|$)/.test(route);
    if (!editor && !lesson && route !== '' && route !== 'index.html') return;
    event.respondWith((async () => {
      try { return await fetch(event.request); }
      catch { return (await caches.open(CACHE)).match(local(editor ? 'tryit.html' : 'index.html')); }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Navigation fetches the latest shell. Match that with current scripts/styles
    // while online, so a newly added route cannot use an older cached router.
    if (/\.(?:js|css)$/.test(url.pathname)) {
      try {
        const response = await fetch(event.request, {cache: 'no-cache'});
        if (response.ok) await cache.put(event.request, response.clone()).catch(() => {});
        return response;
      } catch {
        return (await cache.match(event.request)) || Response.error();
      }
    }
    const saved = await cache.match(event.request);
    return saved || fetch(event.request);
  })());
});
