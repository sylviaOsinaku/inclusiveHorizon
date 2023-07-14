// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCNhDcFCcKbcpVEchq2uaf4NlEHV-02Nw",
  authDomain: "inclusivehorizon-67c86.firebaseapp.com",
  projectId: "inclusivehorizon-67c86",
  storageBucket: "inclusivehorizon-67c86.appspot.com",
  messagingSenderId: "714028739327",
  appId: "1:714028739327:web:41440d4d57fcd93c2b7aca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
//db.settings({ timestampsInSnapshots: true });

export const auth = getAuth(app);
export default app;
