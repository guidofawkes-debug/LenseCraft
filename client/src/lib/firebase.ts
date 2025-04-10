
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCkCohD6L5KBfxPICAD4OE7Wi7ureqEprE",
  authDomain: "the-lense-shop.firebaseapp.com", 
  projectId: "the-lense-shop",
  storageBucket: "the-lense-shop.firebasestorage.app",
  messagingSenderId: "52191686580",
  appId: "1:52191686580:web:9f177e3863c7aefe9a0ce1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
