import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Default config can be read from environment variables or custom local storage
const getSavedConfig = () => {
  try {
    const saved = localStorage.getItem('dripden_firebase_config');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Could not parse saved Firebase config', e);
  }
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
  };
};

let firebaseApp = null;
let firebaseAuth = null;
let firestoreDb = null;
let firebaseStorage = null;

const currentConfig = getSavedConfig();

export const isFirebaseConfigured = () => {
  return !!(currentConfig.apiKey && currentConfig.projectId);
};

if (isFirebaseConfigured()) {
  try {
    firebaseApp = getApps().length > 0 ? getApp() : initializeApp(currentConfig);
    firebaseAuth = getAuth(firebaseApp);
    firestoreDb = getFirestore(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);
    console.info('⚡ Firebase successfully initialized for DripDen.');
  } catch (error) {
    console.warn('Firebase initialization error, fallback to local reactive DB:', error);
  }
}

export const saveCustomFirebaseConfig = (config) => {
  localStorage.setItem('dripden_firebase_config', JSON.stringify(config));
  window.location.reload();
};

export { firebaseApp, firebaseAuth, firestoreDb, firebaseStorage };
