const V='masrofati-v6';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const net=fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c));return r;});
 const cached=()=>caches.match(e.request).then(m=>m||caches.match('index.html'));
 // network first, but fall back to the cache after 3s so a weak connection never hangs the app
 e.respondWith(Promise.race([net,new Promise((_,rej)=>setTimeout(rej,3000))]).catch(()=>cached().then(m=>m||net)));});
