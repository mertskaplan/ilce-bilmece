/* İlçe Bilmece - Saf Önbellek Odaklı Service Worker */
const CACHE_NAME = 'ilce-bilmece-v2.5.4'; // Sürüm değiştiğinde tüm önbellek sunucudan sıfırlanır

const ASSETS = [
    './',
    './index.html',
    './scripts.js',
    './datasets.js',
    './styles.css',
    './manifest.webmanifest',
    './favicon.ico',
    './maps/iller.js'
];

// İlçe haritaları (81 il, toplam ~1,1 MB). Kurulumu yavaşlatmamak için ASSETS'e eklenmez;
// sayfa yüklendikten sonra 'precache-maps' mesajıyla arka planda önbelleğe alınır.
const DISTRICT_MAPS = Array.from({ length: 81 }, (_, i) => `./maps/ilceler/${String(i + 1).padStart(2, '0')}.js`);

// 1. Kurulum: Tarayıcı HTTP önbelleğini (Disk Cache) bypass ederek sunucudan taze dosyaları çek
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            const fetchPromises = ASSETS.map((asset) => {
                // cache: 'reload' ile tarayıcı HTTP önbelleği atlanır, direkt sunucuya istek atılır
                const request = new Request(asset, { cache: 'reload' });
                return fetch(request).then((response) => {
                    if (!response.ok) {
                        throw new Error(`${asset} indirilemedi: ${response.status}`);
                    }
                    return cache.put(asset, response);
                });
            });
            return Promise.all(fetchPromises);
        }).catch((err) => console.warn('Önbelleğe alma hatası:', err))
    );
    self.skipWaiting(); // Beklemeden hemen yeni sürüme geç
});

// 2. Etkinleştirme: Eski sürümlere ait TÜM önbellekleri sil
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => 
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        ).then(() => self.clients.claim()) // Kontrolü hemen tüm sekmelerde ele al
    );
});

// 3. Getirme (Fetch): Sürüm değişmediyse yıldırım hızında önbellekten sun
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Önbellekte varsa ANINDA dön
            if (cachedResponse) {
                return cachedResponse;
            }

            // Önbellekte yoksa ağdan çek ve önbelleğe ekle
            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            });
        })
    );
});

// 4. Çevrimdışı ilçe haritaları: önbellekte olmayanlar arka planda indirilir
self.addEventListener('message', (event) => {
    if (!event.data || event.data.type !== 'precache-maps') return;
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            const queue = [...DISTRICT_MAPS];
            // Aynı anda en fazla 4 istek; ağ hatasında kalanlar bir sonraki açılışta tekrar denenir
            const worker = async () => {
                while (queue.length) {
                    const url = queue.shift();
                    if (await cache.match(url)) continue;
                    const response = await fetch(url);
                    if (response.ok) await cache.put(url, response);
                }
            };
            await Promise.all(Array.from({ length: 4 }, worker)).catch(() => {});
        })
    );
});
