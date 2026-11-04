// Café Lab service worker: keeps the whole app on the phone so it opens without internet.
const VERSION="cafe01";
const CACHE="bica-"+VERSION;
const SHELL=["./","./index.html","./cafe.html","./fb.js","./config.js","./fonts.css","./manifest.webmanifest","./icon-v2-192.png","./icon-v2-512.png","./icon-v2-maskable-512.png","./apple-touch-icon-v2.png","./favicon-v2-48.png","./fonts/fraunces-latin-500-normal.woff2","./fonts/fraunces-latin-700-normal.woff2","./fonts/work-sans-latin-400-normal.woff2","./fonts/work-sans-latin-500-normal.woff2","./fonts/work-sans-latin-600-normal.woff2","./fonts/ibm-plex-mono-latin-500-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("bica-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin)return; // Firebase and links go straight to the network
  const isPage=e.request.mode==="navigate";
  // open instantly from the phone, refresh the copy in the background
  e.respondWith(caches.open(CACHE).then(async c=>{const key=isPage&&!u.pathname.endsWith(".html")?"./index.html":e.request;const hit=await c.match(key,{ignoreSearch:true});
    const net=fetch(e.request,{cache:"no-cache"}).then(r=>{if(r.ok)c.put(key,r.clone());return r}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}return (await net)||new Response("Offline",{status:503})}))});
self.addEventListener("message",e=>{if(e.data==="skipWaiting")self.skipWaiting()});
