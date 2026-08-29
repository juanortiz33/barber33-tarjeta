var CACHE = 'barber33-v12';
var ASSETS = [
  './',
  './registro.html',
  './tarjeta.html',
  './config.js',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf('/api/') !== -1) return;

  e.respondWith(
    fetch(e.request)
      .then(function(r) {
        if (r.ok) {
          var copia = r.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, copia); });
          return r;
        }
        return caches.match(e.request).then(function(cached) { return cached || r; });
      })
      .catch(function() { return caches.match(e.request); })
  );
});
