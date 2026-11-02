// Café Lab service worker: keeps the whole app on the phone so it opens without internet.
const VERSION="d621b6252d";
const CACHE="bica-"+VERSION;
const SHELL=["./","./index.html","./fb.js","./config.js","./fonts.css","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png","./fonts/fraunces-latin-500-normal.woff2","./fonts/fraunces-latin-700-normal.woff2","./fonts/work-sans-latin-400-normal.woff2","./fonts/work-sans-latin-500-normal.woff2","./fonts/work-sans-latin-600-normal.woff2","./fonts/ibm-plex-mono-latin-500-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("bica-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin)return; // Firebase and links go straight to the network
  const isPage=e.request.mode==="navigate";
  // open instantly from the phone, refresh the copy in the background
  e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(isPage?"./index.html":e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r.ok)c.put(isPage?"./index.html":e.request,r.clone());return r}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}return (await net)||new Response("Offline",{status:503})}))});
self.addEventListener("message",e=>{if(e.data==="skipWaiting")self.skipWaiting()});
