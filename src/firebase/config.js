/**
 * WEB AURA 2K26 - Firebase Initialization & Configuration
 * 
 * Supports both Live Firebase (Authentication + Cloud Firestore)
 * and Seamless Local/Offline Mode via MockStore when environment
 * variables are not yet populated.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" &&
  firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    console.log("⚡ Firebase Live Services Initialized Successfully");
  } catch (error) {
    console.warn("⚠️ Firebase Live initialization failed, falling back to Local/Offline Mode:", error);
  }
} else {
  console.log("🎮 WEB AURA 2K26 running in Local/Simulated Real-Time Mode (GTA: San Andreas Engine)");
}

export { app, auth, db, googleProvider };
