// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCIZ1--a9Idtxg9DEbmB-f3w1_26uWlCyg",
//   authDomain: "fir-auth-22faf.firebaseapp.com",
//   projectId: "fir-auth-22faf",
//   storageBucket: "fir-auth-22faf.appspot.com",
//   messagingSenderId: "899637946527",
//   appId: "1:899637946527:web:48b2021b6bdb87367bdaaa"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBMzHHcEfJfeU01Ynz12uwowbgNMJyaUG0",
  authDomain: "test-4a892.firebaseapp.com",
  projectId: "test-4a892",
  storageBucket: "test-4a892.appspot.com",
  messagingSenderId: "752123125167",
  appId: "1:752123125167:web:87ab221dcc1cb205bfa35a",
  measurementId: "G-JLSVGNGNCL"
};

// Initialize Firebase
let Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}
else{
  Firebase = firebase.app();
}

export default Firebase;