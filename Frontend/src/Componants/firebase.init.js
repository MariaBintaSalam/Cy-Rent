// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASd_wATBgHhj_dEvXF8nwUluQ4ql04nI4",
  authDomain: "cy-rent.firebaseapp.com",
  projectId: "cy-rent",
  storageBucket: "cy-rent.appspot.com",
  messagingSenderId: "522205801562",
  appId: "1:522205801562:web:c3c247e2c7d4611c7abc63",
  measurementId: "G-BBJCJV7S4B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
