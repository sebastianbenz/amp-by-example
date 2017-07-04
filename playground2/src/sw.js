importScripts('workbox-sw.prod.js');

const workboxSW = new WorkboxSW({clientsClaim: true});
workboxSW.precache([]);
const networkFirst = workboxSW.strategies.networkFirst();
workboxSW.router.registerRoute('/schedule', networkFirst);
