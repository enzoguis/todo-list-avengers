// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDnoAXhi6EKMGZr_4g0M_dPwNDfGGd8ukg',
  authDomain: 'todolist-a205a.firebaseapp.com',
  projectId: 'todolist-a205a',
  storageBucket: 'todolist-a205a.appspot.com',
  messagingSenderId: '570169261701',
  appId: '1:570169261701:web:228c18565a2441535973ec',
  measurementId: 'G-WTD6RRS3XY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
