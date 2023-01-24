const cacheName = 'v3';

// install method 
self.addEventListener('install', e => {
    console.log('Service worker installation started');
});

// activate method 
self.addEventListener('activate', e => {
    console.log('Service worker installation activated');

    // remove older cache
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Deleting older caches');
                        caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', e => {
    console.log('Service worker is fetching the cached files');

    e.respondWith(
        fetch(e.request)
            .then(res => {
                // make copy or clone of the response
                const resClone = res.clone();

                // open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    });
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    );
});