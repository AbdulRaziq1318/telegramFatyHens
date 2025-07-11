// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3OpjivjNuefrs_1T0Mcd0VBRunxBRPLc",
  authDomain: "faty-hens.firebaseapp.com",
  projectId: "faty-hens",
  storageBucket: "faty-hens.firebasestorage.app",
  messagingSenderId: "793489484733",
  appId: "1:793489484733:web:dd7612b18c2f3468e1c0d4",
  measurementId: "G-L6G1ZKLD7D"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);
