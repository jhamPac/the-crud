import React from 'react'
import { firebaseRef } from 'root/firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import M        from 'materialize-css'
import * as Yup from 'yup'

export default function SignUpForm(props) {
  async function handleSubmit(values, { setSubmitting }) {
    setSubmitting(true)

    await firebaseRef.auth().createUserWithEmailAndPassword(values.email, values.password).catch(function(error) {
      M.toast({html: `${error.message}`})
      setSubmitting(false)
    })

    M.toast({html: 'User sign up successful! Good JOB'})
    setTimeout(() => {
      props.history.push('/dashboard')
    }, 2000)
    setSubmitting(false)

    return
  }

  const formSchema = Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(9, 'Password must be 9 characters or more').required('Password is required')
  })

  return (
    <div className="auth-form">
      <section className="row">
        <div className="col s12">
          <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
             return(
                <Form>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <Field type="text" id="email" name="email"/>
                    <ErrorMessage component="span" name="email" />
                  </div>

                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password"/>
                    <ErrorMessage component="span" name="password" />
                  </div>

                  <div className="button-group">
                    <button className="btn green" type="submit" disabled={formProps.isSubmitting}>Sign Up</button>
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
