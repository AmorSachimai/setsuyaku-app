//import firebase from "firebase/app";
import {} from "firebase/auth";
import {} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvAD55Vd5-ub7SfKVr_2kFAzOFj0zQ0KU",
  authDomain: "setsuyaku-app-component.firebaseapp.com",
  projectId: "setsuyaku-app-component",
  storageBucket: "setsuyaku-app-component.appspot.com",
  messagingSenderId: "884270687130",
  appId: "1:884270687130:web:e697fdcd97ebc6563dd023",
  measurementId: "G-GGMLW2R76S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//onst analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { db };
