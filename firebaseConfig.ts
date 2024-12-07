// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC18BAQunPEDlrE3sF4HaBMMm6X8vvQMww",
  authDomain: "chapmanm3-cigarapp.firebaseapp.com",
  projectId: "chapmanm3-cigarapp",
  storageBucket: "chapmanm3-cigarapp.firebasestorage.app",
  messagingSenderId: "478958432259",
  appId: "1:478958432259:web:17b61b1d13608f5282de36",
  measurementId: "G-K5HSGM50G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
