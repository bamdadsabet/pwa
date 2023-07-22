const VERSION = '2' 
const CACHE_NAME = `cahce-v${VERSION}`;

console.log(CACHE_NAME);

const CACHE_ASSET = [
  "/assets/index-41fabc73.js",
  "/assets/index-d526a0c5.css",
  "/assets/react-35ef61ed.svg",
  "/vite.svg"
]


// installing ServiceWorker
self.addEventListener("install", e => {
  console.log("installing service workers");
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache =>
        cache.addAll(CACHE_ASSET)
      )
      .then(() => self.skipWaiting())
  );
});


// activating ServiceWorker
self.addEventListener('activate', e => {
  console.log('service worker is activated');

  // removing unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if(cacheName ==! CACHE_NAME){
            console.log(`deleting old ${cacheName} service worker`);
            caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// self.addEventListener("activate", e => {
//   e.waitUntil(
//     caches
//       .keys()
//       .then(keyList => Promise.all(keyList.map(key => caches.delete(key))))
//   );
//   return self.clients.claim();
// });

self.addEventListener("fetch", e => {
  console.log("caches: ", caches);
  e.respondWith(
    caches.match(e.request).then(res => {
      console.log('res is:', res);
      if (res) return res;
      return fetch(e.request).catch(() => caches.match(e.request))
    })
  );
});

// // activating ServiceWorker
// self.addEventListener('activate', e => {
//   console.log('activating service worker')
//   e.waitUntil(self.clients.claim())
// })
