importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC4bfpU8llPBxflEnYR3GfI2lYijawRt5w",
  authDomain: "rythu-basket.firebaseapp.com",
  projectId: "rythu-basket",
  storageBucket: "rythu-basket.firebasestorage.app",
  messagingSenderId: "499543437501",
  appId: "1:499543437501:web:eb27cfb0983743d58d07d4"
});

const messaging = firebase.messaging();

// App background / lock screen lo unnappudu vache notification
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Rythu Basket';
  const options = {
    body: payload.notification?.body || 'New fresh update from Rythu Basket!',
    icon: '/icon-512.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: { url: '/' }
  };
  self.registration.showNotification(title, options);
});

// Notification meeda click chesthe app open avvadaniki
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
