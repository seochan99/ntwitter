// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_mlL1MXbnLqkAWyk6IylS0Jnlryz8tXg",
    authDomain: "nwitter-83400.firebaseapp.com",
    projectId: "nwitter-83400",
    storageBucket: "nwitter-83400.appspot.com",
    messagingSenderId: "314581211487",
    appId: "1:314581211487:web:864ce7f34c2af9681dbeea",
    measurementId: "G-HBELSCDGHQ",
};
export default firebase.initializeApp(firebaseConfig);
