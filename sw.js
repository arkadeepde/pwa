// service worker with specific file names

const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'privacy.html',
    'css/style.css',
    'js/myscript.js'
];


// install method 
self.addEventListener('install', e => {
    console.log('Service worker installation started');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Caching  files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// activate method 
self.addEventListener('activate', e => {
    console.log('Service worker installation activated');

    // remove older cache
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Deleting older caches');
                        caches.delete();
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', e => {
    console.log('Service worker is fetching the cached files');
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});