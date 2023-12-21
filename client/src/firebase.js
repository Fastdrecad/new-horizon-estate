// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "new-horizon-60078.firebaseapp.com",
  projectId: "new-horizon-60078",
  storageBucket: "new-horizon-60078.appspot.com",
  messagingSenderId: "918401422425",
  appId: "1:918401422425:web:53c03814a6393233a40d48",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
