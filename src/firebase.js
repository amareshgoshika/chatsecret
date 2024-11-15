import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyD2Ns-H_W3hnlwkAdMPxslebX281udzLoQ",
  authDomain: "chatsecret-bbc93.firebaseapp.com",
  projectId: "chatsecret-bbc93",
  storageBucket: "chatsecret-bbc93.firebasestorage.app",
  messagingSenderId: "470398694405",
  appId: "1:470398694405:web:51b17d1ad0d664c030d86c",
  measurementId: "G-E6S4DMTYWT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);

export { db, collection, getDocs, query, where, auth };