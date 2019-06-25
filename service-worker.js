var cacheName = 'rr-cache-v1';

var filesToCache = [
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});



self.addEventListener('fetch', function(e) {
  console.log(e.request);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
