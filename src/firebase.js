// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAlximtuYeeh-a_f_98foOKsUFWrCVkhCg",
	authDomain: "todo-app-with-firebase-bf7b7.firebaseapp.com",
	projectId: "todo-app-with-firebase-bf7b7",
	storageBucket: "todo-app-with-firebase-bf7b7.appspot.com",
	messagingSenderId: "1091157625736",
	appId: "1:1091157625736:web:57e3f8066a5654f2ba483d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);