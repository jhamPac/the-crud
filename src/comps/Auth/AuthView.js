import React, { Fragment } from 'react'
import { firebaseRef }     from 'root/firebase'
import M     from 'materialize-css'

import LoginForm  from './LoginForm'
import SignUpForm from './SignUpForm'

export default function AuthView(props) {

  async function handleSignOut() {
    await firebaseRef.auth().signOut().catch(error => {
      M.toast({html: `${error.message}`})
      throw new Error('No, never log out')
    })

    M.toast({html: 'See you later'})
  }

  return (
    <div id="auth-view" className="container">
      {
        (firebaseRef.auth().currentUser)
          ? <button className="btn red" onClick={handleSignOut}>Peace Out ✌🏾</button>

          : <Fragment>
              <section className="login">
                <LoginForm { ...props }/>
              </section>
               <div className="divider"></div>
              <section className="sign-up">
                <SignUpForm { ...props }/>
              </section>
            </Fragment>
      }
    </div>
  )
}
