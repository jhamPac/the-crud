import { useState, useEffect } from 'react'
import { firebaseRef } from '../firebase'

export default function useAuth({ defaultValue }) {
  const [ userLoggedIn, setLoginState ] = useState(defaultValue)
  
  useEffect(() => {
    firebaseRef.auth().onAuthStateChanged(user => {
      (user) ? setLoginState(true) : setLoginState(false)
    })
  })

  return userLoggedIn
}
