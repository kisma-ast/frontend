// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTEyvgJU2Xff1ZX2-43tkngoddNgHokcY",
  authDomain: "swapmoney-c9aac.firebaseapp.com",
  projectId: "swapmoney-c9aac",
  storageBucket: "swapmoney-c9aac.firebasestorage.app",
  messagingSenderId: "143953448680",
  appId: "1:143953448680:web:7ca985610ef81b796e035d",
  measurementId: "G-PNZ5VHF109",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
