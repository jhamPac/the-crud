import React from 'react'
import { firebaseRef } from '../firebase'
import { Formik, FormikProps, Form, Field } from 'formik';

export default function AuthPage(props) {

  function handleSubmit(values, { props, setSubmitting }) {
    setSubmitting(false)
  }

  return (
    <div className="container">
      <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        validate={(values) => {
           let errors = [];

           return errors;
        }}
        onSubmit={handleSubmit}
        render={(formProps) => {
         return(
            <Form>
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email"/>
              <button className="btn btn-blue" type="submit" disabled={formProps.isSubmitting}>Submit Form</button>
            </Form>
         )
       }}
      />
    </div>
  )
}
