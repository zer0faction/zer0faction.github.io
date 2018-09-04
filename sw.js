// /**
//  * Welcome to your Workbox-powered service worker!
//  *
//  * You'll need to register this file in your web app and you should
//  * disable HTTP caching for this fildde too.
//  * See https://goo.gl/nhQhGp
//  *
//  * The rest of the code is auto-generated. Please don't update this file
//  * directly; instead, make changes to your Workbox build cdddonfiguration
//  * and re-run your build process.
//  * See https://goo.gl/2aRDsh
//  */
//
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');
//
// /**
//  * The workboxSW.precacheAndRoute() method efficiently caches and responds to
//  * requests for URLs in the manifest.
//  * See https://goo.gl/S9QRab
//  */
//
var CACHE_NAME = 'vuepwa';
var urlsToCache = [
  '/dist/build.js',
  '/dist/index.html',
  '/index.html',
  '/public/img/icons',
  '/src/App.vue',
  '/src/main.js',
  '/src/assets/'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open('')
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// self.__precacheManifest = [
//   {
//     "url": "dist/build.js",
//     "revision": "123de730716c8e828e3d1a09c8b009a2"
//   },
//   {
//     "url": "dist/index.html",
//     "revision": "f0f373ed56ef95c071e1fa753d9ebbfe"
//   },
//   {
//     "url": "index.html",
//     "revision": "3fc880913b92e43db961c50a74fae21c"
//   },
//   {
//     "url": "public/img/icons/android-chrome-192x192.png",
//     "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
//   },
//   {
//     "url": "public/img/icons/android-chrome-512x512.png",
//     "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
//   },
//   {
//     "url": "public/img/icons/apple-touch-icon-120x120.png",
//     "revision": "936d6e411cabd71f0e627011c3f18fe2"
//   },
//   {
//     "url": "public/img/icons/apple-touch-icon-152x152.png",
//     "revision": "1a034e64d80905128113e5272a5ab95e"
//   },
//   {
//     "url": "public/img/icons/apple-touch-icon-180x180.png",
//     "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
//   },
//   {
//     "url": "public/img/icons/apple-touch-icon-60x60.png",
//     "revision": "9a2b5c0f19de617685b7b5b42464e7db"
//   },
//   {
//     "url": "public/img/icons/apple-touch-icon-76x76.png",
//     "revision": "af28d69d59284dd202aa55e57227b11b"
//   },
//   {
//     "url": "public/img/icons/apple-touch-icon.png",
//     "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
//   },
//   {
//     "url": "public/img/icons/favicon-16x16.png",
//     "revision": "4bb1a55479d61843b89a2fdafa7849b3"
//   },
//   {
//     "url": "public/img/icons/favicon-32x32.png",
//     "revision": "98b614336d9a12cb3f7bedb001da6fca"
//   },
//   {
//     "url": "public/img/icons/msapplication-icon-144x144.png",
//     "revision": "b89032a4a5a1879f30ba05a13947f26f"
//   },
//   {
//     "url": "public/img/icons/mstile-150x150.png",
//     "revision": "058a3335d15a3eb84e7ae3707ba09620"
//   },
//   {
//     "url": "public/img/icons/safari-pinned-tab.svg",
//     "revision": "f22d501a35a87d9f21701cb031f6ea17"
//   },
//   {
//     "url": "public/robots.txt",
//     "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
//   },
//   {
//     "url": "src/App.vue",
//     "revision": "8c0984d97eed0e7c90cf85a5db748423"
//   },
//   {
//     "url": "src/assets/logo.png",
//     "revision": "82b9c7a5a3f405032b1db71a25f67021"
//   },
//   {
//     "url": "src/main.js",
//     "revision": "fc567c18696cf9625371528474a889ce"
//   },
//   {
//     "url": "src/registerServiceWorker.js",
//     "revision": "95cc3ee3452d555b9e807746a497850a"
//   }
// ].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
