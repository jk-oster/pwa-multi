"use strict";

// SW is only triggered by events!
// SW should cache all our static assets to make them available offline
// defined array of static assets
const staticAssets = [
    './index.html',
    './manifest.json',
    './js/kwm.js',
    './css/bootstrap.quartz.css',
    './templates/404.tpl',
    './templates/app.tpl',
    './templates/home.tpl',
    './templates/match.tpl',
    './templates/profile.tpl',
    './templates/question-detail.tpl',
    './templates/task-detail.tpl',
    './templates/test.tpl',
    './templates/components/answer.tpl',
    './templates/components/loading-spinner.tpl',
    './templates/components/match-details.tpl',
    './templates/components/question-card.tpl',
    './templates/components/question-overview.tpl',
    './templates/components/test.tpl',
];

self.addEventListener('install', event => {
    console.log('SW install');
    event.waitUntil(caches.open('pwa-static').then(function (cache) {
        return cache.addAll(staticAssets).then(() => {
            console.log('Assets cached');
        }).catch(err => {
            console.log('Error caching assets', err);
        });
    }));
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// Events sent from application to network
// Intercepting fetch events
self.addEventListener('fetch', e => {
    console.log('fetch successfully intercepted', e);
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin && req.method === 'GET') {
        e.respondWith(cacheFirst(req));
    } else return fetch(req);
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    if(cachedResponse) console.info('served from cache');
    else console.log('served from network');
    // Fetch request from network if not cached
    return cachedResponse || fetch(req);
}

async function networkFirst(request) {
    const dynamicCache = await caches.open('pwa-dynamic');
    try {
        console.log('fetching network response');
        const networkResponse = await fetch(request);
        await dynamicCache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.log('using fallback network response', error);
        // If new items could not be loaded use fallback response
        const cachedResponse = await dynamicCache.match(request);
        return cachedResponse || caches.match('./fallback.json');
    }
}

self.addEventListener('push', event => {
    console.log('Push received', event.data);
    const title = 'KWM-Push Message';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title, options));
});