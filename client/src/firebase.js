import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_rkdSfOzSdUJa3sDANZ9gYMpw95-GYMA",
  authDomain: "resumeanalyzer-6bd07.firebaseapp.com",
  projectId: "resumeanalyzer-6bd07",
  storageBucket: "resumeanalyzer-6bd07.firebasestorage.app",
  messagingSenderId: "703942608949",
  appId: "1:703942608949:web:08ed2fddbdcac61104097c",
  measurementId: "G-KZE1Z5BL3E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
