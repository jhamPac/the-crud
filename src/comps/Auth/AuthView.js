import React from 'react'
import { firebaseRef } from 'root/firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import M from 'materialize-css'
import * as Yup from 'yup'

export default function AuthView(props) {
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
  })

  return (
    <div id="auth-view" className="container">
      <section className="row">
        <div className="col s12">
          <h2>Sign up with a Magic🧙🏿‍♀️ Link</h2>
          <Formik
            initialValues={{
                email: ''
            }}
            validationSchema={formSchema}
            onSubmit={() => console.log('yeah')}
            render={(formProps) => {
             return(
                <Form>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <Field type="text" id="email" name="email"/>
                    <ErrorMessage className="red-text" component="span" name="email" />
                  </div>

                  <div className="button-group">
                    <button className="btn green" type="submit" disabled={formProps.isSubmitting}>Sign me up!</button>
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
