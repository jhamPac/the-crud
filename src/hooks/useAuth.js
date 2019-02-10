import { useState, useEffect } from 'react'
import { firebaseRef } from '../firebase'

export default function useAuth() {
  const [ userLoggedIn, setLoginState ] = useState(false)

  useEffect(() => {
    firebaseRef.auth().onAuthStateChanged(user => {
      (user) ? setLoginState(true) : setLoginState(false)
    })
  })

  return userLoggedIn
}
