// Letakkan di folder yang sama dengan index.html (root situs)
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');
const firebaseConfig = {
    apiKey: "AIzaSyDTngOtrTtWywrDQxzVo2eCCrB_AmtmNQE",
    authDomain: "slaberan-kardio-4785e.firebaseapp.com",
    databaseURL: "https://slaberan-kardio-4785e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "slaberan-kardio-4785e",
    storageBucket: "slaberan-kardio-4785e.firebasestorage.app",
    messagingSenderId: "187525474575",
    appId: "1:187525474575:web:78058751c9f1e5f0d2f67a",
    measurementId: "G-65H4C5VXTJ"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Pesan data-only dari Cloud Function ditampilkan di sini (aplikasi tertutup / di latar belakang)
messaging.onBackgroundMessage((p) => {
  const d = p.data || {};
  self.registration.showNotification(d.judul || 'MedLog', { body: d.isi || '', tag: d.tag, icon: 'icon_192x192.png', badge: 'icon_192x192.png', requireInteraction: true });
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => (l.length ? l[0].focus() : clients.openWindow('./'))));
});
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
