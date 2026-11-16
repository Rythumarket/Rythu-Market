import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4bfpU8llPBxflEnYR3GfI2lYijawRt5w",
  authDomain: "rythu-basket.firebaseapp.com",
  projectId: "rythu-basket",
  storageBucket: "rythu-basket.firebasestorage.app",
  messagingSenderId: "499543437501",
  appId: "1:499543437501:web:eb27cfb0983743d58d07d4",
  measurementId: "G-YGL5F3D23Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
