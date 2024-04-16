//import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
//import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";



//import AsyncStorage from "@react-native-async-storage/async-storage";

// import {getReactNativePersistence, initializeAuth} from 'firebase/auth';

const firebaseConfig = {

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
//const auth = getAuth(app, AsyncStorage); // 
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, app };
