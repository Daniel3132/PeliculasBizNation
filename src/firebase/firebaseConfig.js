// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Fi frrebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwOXtoWVyx7y70lCH0q0uUWAQkDuCStwg",
  authDomain: "peliculas-e504f.firebaseapp.com",
  projectId: "peliculas-e504f",
  storageBucket: "peliculas-e504f.appspot.com",
  messagingSenderId: "609169057836",
  appId: "1:609169057836:web:7c7d13655f857fb4e64989",
  measurementId: "G-X2PZ1L1RN7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const baseDatos = getFirestore()

export {
  app,
  baseDatos,
}