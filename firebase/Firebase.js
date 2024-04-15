//import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


// import AsyncStorage from "@react-native-async-storage/async-storage";

// import {getReactNativePersistence, initializeAuth} from 'firebase/auth';

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

// const auth = initializeAuth(app, {
//    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
