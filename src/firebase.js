import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCFCQaU8a96kos470rGh-0yLIQgAv4AiIM',
  authDomain: 'vigia-56137.firebaseapp.com',
  projectId: 'vigia-56137',
  storageBucket: 'vigia-56137.firebasestorage.app',
  messagingSenderId: '112371837401',
  appId: '1:112371837401:web:0dc5905e9217de6a4651c8'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
