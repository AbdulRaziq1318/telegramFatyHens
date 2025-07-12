import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRVW5YNXQD-M5q4JwJnWcnRLVOYbzzsnc",
  authDomain: "fat-hen-admin.firebaseapp.com",
  projectId: "fat-hen-admin",
  storageBucket: "fat-hen-admin.appspot.com",
  messagingSenderId: "156040378236",
  appId: "1:156040378236:web:5e3e8d6732e17a73a416f9",
  measurementId: "G-XX0HK0XJS0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
