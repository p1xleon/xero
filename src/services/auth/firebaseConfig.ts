// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbeEVkjezDIbUCfCRoc_u5hLrnhvvDc2c",
  authDomain: "xero-clash.firebaseapp.com",
  projectId: "xero-clash",
  storageBucket: "xero-clash.firebasestorage.app",
  messagingSenderId: "232129300628",
  appId: "1:232129300628:web:3685d00a472f393680cc81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
console.log("Firebase app initialized:", app.name);
