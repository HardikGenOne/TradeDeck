// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBQZufYHxH1Ts7-te0TTtjthSAvu4hvvKA",
  authDomain: "tradedeck-bd347.firebaseapp.com",
  projectId: "tradedeck-bd347",
  storageBucket: "tradedeck-bd347.firebasestorage.app",
  messagingSenderId: "761486808749",
  appId: "1:761486808749:web:4e67cacd142419be2c1824",
  measurementId: "G-2ZGC0332ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app;