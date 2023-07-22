// self.addEventListener('fetch', e => {
//   console.log(`fetching from ${e.request.url}`)
//   if(navigator.online) {
//     const fetchReq = e.request.clone()
//     return fetch(fetchReq).then(res => {
//       if(!res || res.status !== 200 || res.type !== 'basic')
//         return res
//       const resToCache = res.clone()
//       caches.open(CACHE_NAME).then(cache => cache.put(e.request, resToCache))
//       return res
//     })
//   }
//   else
//     e.respondWith(
//       caches.match(e.request).then(res => {
//         if(res)
//           return res
//       })
//     )
// })



// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

const register = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};


const unRegisterAll = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations()
  for(let registration of registrations) {
      registration.unregister();
  } 
}


export {register, unRegisterAll }