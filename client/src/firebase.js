// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f4ed3.firebaseapp.com",
  projectId: "mern-blog-f4ed3",
  storageBucket: "mern-blog-f4ed3.appspot.com",
  messagingSenderId: "53698405311",
  appId: "1:53698405311:web:74c9125ab412fc5cce370a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
