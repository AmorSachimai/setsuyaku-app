//import firebase from "firebase/app";
//import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
//import { initializeApp } from "firebase-admin/app";
//import * as admin from "firebase-admin";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { initializeApp } from "firebase-admin/app";
// import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
//import Admin from "firebase-admin";

const firebaseConfig = {

};


// Initialize Firebase
//const { initializeApp } = require("firebase-admin/app");
const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
//const auth = getAuth(app, AsyncStorage); // 
//const auth = getAuth(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth, app };
