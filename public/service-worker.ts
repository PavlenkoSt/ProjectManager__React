const CACHE_NAME = 'check-list';
const urlsToCache = ['index.html'];

self.addEventListener('install', (e: any) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
});

self.addEventListener('fetch', (e: any) => {
    e.respondWith(
      caches.match(e.request)
        .then(() => {
          return fetch(e.request)
            .catch(() => caches.match('offline.html'))
        })
    )
});

self.addEventListener('activate', (e: any) => {
  const cachesWhitelist = [];
  cachesWhitelist.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if(!cachesWhitelist.includes(cacheName)){
          return caches.delete(cacheName)
        }
      })
    ))
  )
});