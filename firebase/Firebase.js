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
//discordにあるよ/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//onst analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { db };
