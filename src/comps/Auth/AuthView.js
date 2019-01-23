import React from 'react'

import LoginForm  from './LoginForm'
import SignUpForm from './SignUpForm'

export default function AuthView(props) {
  return (
    <div id="auth-view" className="container">
      <section className="login">
        <LoginForm />
      </section>
      <section className="sign-up">

      </section>
    </div>
  )
}
