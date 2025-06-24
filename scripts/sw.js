importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.3.0/workbox-sw.min.js');

const { registerRoute, NavigationRoute, setDefaultHandler } = workbox.routing;
const { NetworkFirst, CacheFirst, StaleWhileRevalidate, NetworkOnly } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;
const { BackgroundSyncPlugin } = workbox.backgroundSync;
const { BroadcastUpdatePlugin } = workbox.broadcastUpdate;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const backgroundSyncQueue = new workbox.backgroundSync.Queue('gdupQueue', {
  maxRetentionTime: 24 * 60 // Retry for up to 24 hours (specified in minutes)
});

if (self.location.hostname === 'localhost') {
  setDefaultHandler(new NetworkFirst());
  self.skipWaiting();
  clients.claim();
} else {
  const CACHE_NAME = 'cache-v0'/*#replaceCacheName*/;

  self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });

  let updateInterval;
  self.addEventListener('online', () => {
    updateInterval = setInterval(() => {
      self.registration.update();
    }, 5 * 60 * 1000); // 5 minutes
  });

  self.addEventListener('offline', () => {
    if (updateInterval) clearInterval(updateInterval);
  });

  const urlsToCache = ''/*#replaceUrls*/

  workbox.precaching.precacheAndRoute(
    urlsToCache.map(url => ({
      url,
      revision: CACHE_NAME
    }))
  );


  // registerRoute(
  //   ({ url }) => url.pathname.startsWith('/_server'),
  //   })
  // );

  setDefaultHandler(
    new NetworkOnly({
      plugins: [
        {
          handlerDidError: async ({ request }) => {
            const cache = await caches.open('gdup-data');
            const cachedResponse = await cache.match(request);
            if (cachedResponse) return cachedResponse;

            return caches.match('/offline');
          }
        }
      ]
    })
  );

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.startsWith('workbox-') &&
              cacheName !== 'gdup-data' &&
              cacheName !== 'github-avatars' &&
              cacheName !== 'navigations' &&
              cacheName !== 'user-data' &&
              cacheName !== 'default') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener('sync', (event) => {
    if (event.tag === 'user-data-sync') {
      // Handle user data requests
      event.waitUntil(backgroundSyncQueue.replayRequests());
    } else if (event.tag === 'gdup-data-queue') {
      // Handle gdup data requests
      const gdupDataQueue = new workbox.backgroundSync.Queue('gdup-data-queue');
      event.waitUntil(gdupDataQueue.replayRequests());
    }
  });

  self.addEventListener('push', (event) => {
    if (event.data) {
      const data = event.data.json();
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icons/android-chrome-192x192.png',
        badge: '/icons/android-chrome-72x72.png',
        data: data.url
      });
    }
  });

  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event.notification.data) {
      event.waitUntil(
        clients.openWindow(event.notification.data)
      );
    }
  });
}
