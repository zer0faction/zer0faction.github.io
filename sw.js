// /**
//  * Welcome to your Workbox-powered service worker!
//  *
//  * You'll need to register this file in your web app and you should
//  * disable HTTP caching for this file too.
//  * See https://goo.gl/nhQhGp
//  *
//  * The rest of the code is auto-generated. Please don't update this file
//  * directly; instead, make changes to your Workbox build configuration
//  * and re-run your build process.
//  * See https://goo.gl/2aRDsh
//  */
//
// importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");
//
// /**
//  * The workboxSW.precacheAndRoute() method efficiently caches and responds to
//  * requests for URLs in the manifest.
//  * See https://goo.gl/S9QRabhhh
//  */
// self.__precacheManifest = [
//   {
//     "url": "App.vue",
//     "revision": "618d875d9f3e2ea01243a888c23e5fc6"
//   },
//   {
//     "url": "assets/logo.png",
//     "revision": "82b9c7a5a3f405032b1db71a25f67021"
//   },
//   {
//     "url": "main.js",
//     "revision": "3e1d05bd9260c62c829837e16c61e54f"
//   }
// ].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

if (navigator.serviceWorker.controller) {
  console.log('[PWA Builder] active service worker found, no need to register')
} else {
  //Register the ServiceWorker
  navigator.serviceWorker.register('pwabuider-sw.js', {
    scope: './'
  }).then(function(reg) {
    console.log('Service worker has been registered for scope:'+ reg.scope);
  });
}

self.addEventListener('install', function(event) {
  var offlinePage = new Request('offline.html');
  event.waitUntil(
    fetch(offlinePage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        console.log('[PWA Builder] Cached offline page during Install'+ response.url);
        return cache.put(offlinePage, response);
      });
    }));
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
        console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
        return caches.open('pwabuilder-offline').then(function(cache) {
          return cache.match('offline.html');
        });
      }
    ));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline').then(function(cache) {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
    return cache.put(offlinePage, response);
  });
});
