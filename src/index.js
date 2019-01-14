import dotenv from 'dotenv'
dotenv.config()

import 'babel-polyfill'
import React    from 'react'
import ReactDOM from 'react-dom'

// Apollo setup
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://us-central1-blackjynxy.cloudfunctions.net/api'}),
  cache: new InMemoryCache()
})

import AuthPage   from './comps/AuthPage'
import FoodSupply from './comps/FoodSupply'

import './scss/main'

function Application() {
  return(
    <AuthPage />
  )
}

function render(Component) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    document.getElementById('mount-point')
  )
}

if (document.readyState !== 'loading') {
  render(Application)
} else {
  document.addEventListener('DOMContentLoaded', render.bind(null, Application))
}
