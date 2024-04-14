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