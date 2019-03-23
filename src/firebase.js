import firebase from 'firebase/app'
require("firebase/auth")
require("firebase/firestore")

const firebaseRef = firebase

const config = {
  apiKey           : process.env.API_KEY,
  authDomain       : process.env.AUTH_DOMAIN,
  databaseURL      : process.env.DB_URL,
  projectId        : process.env.PROJECT_ID,
  storageBucket    : process.env.STORAGE_B,
  messagingSenderId: process.env.MESS_SENDER_ID
}

firebaseRef.initializeApp(config)

export {firebaseRef}
