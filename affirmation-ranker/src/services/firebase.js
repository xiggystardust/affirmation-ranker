import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB2ZRdIhJHHbNUevR-sRb3p7pXZu-C4uyQ",
  authDomain: "affirmation-ranker.firebaseapp.com",
  projectId: "affirmation-ranker",
  storageBucket: "affirmation-ranker.firebasestorage.app",
  messagingSenderId: "1078935274979",
  appId: "1:1078935274979:web:3426e7000acca944c24cd6"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
