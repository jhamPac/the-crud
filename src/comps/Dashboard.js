import React from 'react'
import { firebaseRef } from '../firebase'

export default function Dashboard() {

  setTimeout(async function() {
    await firebaseRef.auth.signOut()
  }, 8000)

  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  )
}
