import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBY3SKGhYJYDAXxiW94fFKi0oHBgHr_P5I",
  authDomain: "crud-9d311.firebaseapp.com",
  projectId: "crud-9d311",
  storageBucket: "crud-9d311.appspot.com",
  messagingSenderId: "359229062505",
  appId: "1:359229062505:web:5853ba1dbbc6cc802411f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
