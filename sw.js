const CACHE_NAME = "phase14-cache-v1";
const URLS_TO_CACHE = [
 "/",
 "/index.html",
 "/manifest.json",
 "/service-worker.js",
 "/icon-192.png",
 "/icon-512.png"
];

self.addEventListener("install", event => {
 event.waitUntil(
   caches.open(CACHE_NAME).then(cache => {
     return cache.addAll(URLS_TO_CACHE);
   })
 );
});

self.addEventListener("fetch", event => {
 event.respondWith(
   caches.match(event.request).then(response => {
     return response || fetch(event.request);
   })
 );
});

self.addEventListener("activate", event => {
 event.waitUntil(
   caches.keys().then(cacheNames => {
     return Promise.all(
       cacheNames.map(cache => {
         if (cache !== CACHE_NAME) {
           return caches.delete(cache);
         }
       })
     );
   })
 );
});
