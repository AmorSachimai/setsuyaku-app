//import firebase from "firebase/app";
import {} from "firebase/auth";
import {} from "firebase/firestore";
//import AsyncStorage from "@react-native-async-storage/async-storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// import {
//   getReactNativePersistence,
//   initializeAuth,
// } from "firebase/auth/react-native";

const firebaseConfig = {
  //discordにあるよ/
  apiKey: "AIzaSyCvAD55Vd5-ub7SfKVr_2kFAzOFj0zQ0KU",
  authDomain: "setsuyaku-app-component.firebaseapp.com",
  projectId: "setsuyaku-app-component",
  storageBucket: "setsuyaku-app-component.appspot.com",
  messagingSenderId: "884270687130",
  appId: "1:884270687130:web:e697fdcd97ebc6563dd023",
  measurementId: "G-GGMLW2R76S",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
//onst analytics = getAnalytics(app);

// // add this to init auth with persistence
// initializeAuth(app, {
//   persistence: reactNativeLocalPersistence,
// });

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };




// import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
// import { Auth, getAuth, initializeAuth } from "firebase/auth";
// import { getReactNativePersistence } from "firebase/auth/react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import config from "./config.json";

// let firebaseApp: FirebaseApp;
// let fireAuth: Auth;
// if (getApps().length < 1) {
//   firebaseApp = initializeApp(config);
//   fireAuth = initializeAuth(firebaseApp, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// } else {
//   firebaseApp = getApp();
//   fireAuth = getAuth();
// }