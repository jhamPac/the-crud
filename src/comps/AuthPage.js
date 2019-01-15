import React from 'react'
import { firebaseRef } from '../firebase'
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import Yup form 'yup'

export default function AuthPage(props) {

  function handleSubmit(values, { props, setSubmitting }) {
    console.log(values)
    setSubmitting(false)
    return
  }

  return (
    <div className="container">
      <section className="row">
        <div className="col s12">
          <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validate={(values) => {
               let errors = {};

               if (!values.email) errors.email = "Email is required"

               return errors;
            }}
            onSubmit={handleSubmit}
            render={(formProps) => {
             return(
                <Form>
                  <div>
                    <label htmlFor="email">Email</label>
                    <Field type="text" id="email" name="email"/>
                    <ErrorMessage name="email" />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password"/>
                  </div>

                  <button className="btn btn-blue" type="submit" disabled={formProps.isSubmitting}>Submit Form</button>
                </Form>
             )
           }}
          />
        </div>
      </section>
    </div>
  )
}
