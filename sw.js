// Offline: po pierwszym otwarciu appka działa bez internetu.
// Strategia: sieć najpierw (żeby aktualizacje wchodziły same), cache jako zapas.
//
// 2026-08-10: Paweł dostawał starą wersję appki mimo świeżych commitów —
// przyczyna: GitHub Pages wysyła `Cache-Control: max-age=600` na index.html,
// a zwykłe `fetch()` w tym SW respektuje TEN cache HTTP (nie tylko Cache API
// service workera) — więc network-first czasem po cichu zwracał odpowiedź
// sprzed 10 minut, nie prawdziwie świeżą. `cache:'no-store'` wymusza
// pominięcie warstwy HTTP cache, zostaje tylko nasz jawny Cache API niżej.
const C = 'dart-v4'; // bump = wymusza skasowanie starego cache u wszystkich (2026-08-10, bug głosu ElevenLabs)
const FILES = ['./', './index.html', './manifest.json', './icon.png', './icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, {cache: 'no-store'})
      .then(r => {
        const copy = r.clone();
        caches.open(C).then(c => c.put(e.request, copy));
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
