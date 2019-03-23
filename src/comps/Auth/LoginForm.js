import React from 'react'
import {firebaseRef} from 'root/firebase'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import M        from 'materialize-css'
import * as Yup from 'yup'

export default function LoginForm(props) {
  async function handleSubmit(values, {setSubmitting}) {
    setSubmitting(true)

    await firebaseRef.auth().signInWithEmailAndPassword(values.loginEmail, values.loginPassword)
    .catch(function(error) {
      M.toast({html: `${error.message}`})
      setSubmitting(false)
      throw new Error('login unsuccessful')
    })

    M.toast({html: 'Login successful!'})
    setTimeout(() => {
      props.history.push('/dashboard')
    }, 2000)
    setSubmitting(false)

    return
  }

  const formSchema = Yup.object().shape({
    loginEmail: Yup.string().email('Email not valid').required('Email is required'),
    loginPassword: Yup.string().required('Password is required')
  })

  return (
    <div className="auth-form">
      <section className="row">
        <div className="col s12">
          <Formik
            initialValues={{
                loginEmail: '',
                loginPassword: ''
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
             return(
                <Form>
                  <div className="input-group">
                    <label htmlFor="loginEmail">Email</label>
                    <Field type="text" id="loginEmail" name="loginEmail"/>
                    <ErrorMessage component="span" name="loginEmail" />
                  </div>

                  <div className="input-group">
                    <label htmlFor="loginPassword">Password</label>
                    <Field type="password" id="loginPassword" name="loginPassword"/>
                    <ErrorMessage component="span" name="loginPassword" />
                  </div>

                  <div className="button-group">
                    <button className="btn blue" type="submit" disabled={formProps.isSubmitting}>Login</button>
                  </div>
                </Form>
             )
           }}
          />
        </div>
      </section>
    </div>
  )
}
