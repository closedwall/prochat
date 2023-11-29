import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// const key = process.env.REACT_APP_FIREBASE_KEY;
const firebaseConfig = {
  apiKey:key,
  authDomain: "prochat-2297e.firebaseapp.com",
  projectId: "prochat-2297e",
  storageBucket: "prochat-2297e.appspot.com",
  messagingSenderId: "1096221209238",
  appId: "1:1096221209238:web:e619fc5b732a09bdb088b7"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();