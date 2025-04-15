// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtLM5QpLz0RUFBhEkNBIub1YGxrRr82Jk",
    authDomain: "campus-app-6db5c.firebaseapp.com",
    projectId: "campus-app-6db5c",
    storageBucket: "campus-app-6db5c.firebasestorage.app",
    messagingSenderId: "1034052643829",
    appId: "1:1034052643829:web:73671fa88976ee968dcebc",
    measurementId: "G-5QD6J2EPDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// const analytics = getAnalytics(app);