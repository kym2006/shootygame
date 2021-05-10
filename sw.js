var cacheName = 'shootygame-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './',
                'index.html',
                'bullet.js',
                'p5.min.js',
                'Player.js',
                'sketch.js'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});

self.addEventListener('fetch', function (event) {
    if (navigator.onLine) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.open(cacheName).then(function(cache) {
            return cache.match(event.request).then(function(res) {
                return res || fetch(event.request);
            });
        })
    );
});
