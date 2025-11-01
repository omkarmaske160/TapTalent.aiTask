import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyDS5i5qECmMKLbDfDOm2irPlAdbrlTWu1E",
    authDomain: "ecom-77174.firebaseapp.com",
    projectId: "ecom-77174",
    storageBucket: "ecom-77174.appspot.com",
    messagingSenderId: "894218554052",
    appId: "1:894218554052:web:1d61e87e6444650bfd1791"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ Helper functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);