// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV2CI9rKoPzb_zUEMLV_hUR3NZr8J3s-Q",
  authDomain: "snort-sim-app.firebaseapp.com",
  projectId: "snort-sim-app",
  storageBucket: "snort-sim-app.appspot.com",
  messagingSenderId: "185593952595",
  appId: "1:185593952595:web:e7d62509453f92892cc9a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;