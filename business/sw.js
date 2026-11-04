// Café Lab Business service worker: keeps the business app on the phone so it opens without internet.
const VERSION="biz02";const CACHE="cafelab-biz-"+VERSION;
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png","./favicon-48.png","../fonts.css","../fonts/fraunces-latin-500-normal.woff2","../fonts/fraunces-latin-700-normal.woff2","../fonts/work-sans-latin-400-normal.woff2","../fonts/work-sans-latin-500-normal.woff2","../fonts/work-sans-latin-600-normal.woff2","../fonts/ibm-plex-mono-latin-500-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("cafelab-biz-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  const key=e.request.mode==="navigate"?"./index.html":e.request;
  e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(key,{ignoreSearch:true});
    const net=fetch(e.request,{cache:"no-cache"}).then(r=>{if(r.ok)c.put(key,r.clone());return r}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}return (await net)||new Response("Offline",{status:503})}))});
