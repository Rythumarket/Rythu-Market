import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC4bfpU8llPBxflEnYR3GfI2lYijawRt5w",
  authDomain: "rythu-basket.firebaseapp.com",
  projectId: "rythu-basket",
  storageBucket: "rythu-basket.firebasestorage.app",
  messagingSenderId: "499543437501",
  appId: "1:499543437501:web:eb27cfb0983743d58d07d4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const VAPID_KEY = 'BPzprc74bXyO4bmUF7-1XqgCi-qLbkYoiPc4Gkd4HLDGG1MNiOXB3HpIMoaNS-plwf8ZVPQVVnn9CGhUeUF7E5Q';

export const requestFcmDeviceToken = async () => {
  try {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return null;
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return null;

    const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: reg,
    });
    return token || null;
  } catch {
    return null;
  }
};
