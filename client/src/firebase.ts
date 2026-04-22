import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Our web app's Firebase configuration (example)
const firebaseConfig = {
  apiKey: "AIzaSyBQ9C7QVvCiwG2Sa2gLb2p4yrY7WN1Fwzw",
  authDomain: "recipefinder-840c9.firebaseapp.com",
  projectId: "recipefinder-840c9",
  storageBucket: "recipefinder-840c9.firebasestorage.app",
  messagingSenderId: "803133171696",
  appId: "1:803133171696:web:0e2ae533997528090f9f35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const auth = getAuth();