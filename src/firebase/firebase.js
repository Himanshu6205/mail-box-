// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvRwOCi6i68SvFYhZ7y_1-xZRpDUYn3Xk",
  authDomain: "mail-champ-2a6d2.firebaseapp.com",
  projectId: "mail-champ-2a6d2",
  storageBucket: "mail-champ-2a6d2.firebasestorage.app",
  messagingSenderId: "475268111108",
  appId: "1:475268111108:web:32d79770bab7b29bff0e51",
  measurementId: "G-Q3DYF89DTN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
