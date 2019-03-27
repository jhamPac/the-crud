// setup environment variables
import dotenv from 'dotenv'
dotenv.config()

import 'babel-polyfill'
import React    from 'react'
import ReactDOM from 'react-dom'
import M        from 'materialize-css'

// initialize materialize
M.AutoInit()

// Apollo setup
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://us-central1-blackjynxy.cloudfunctions.net/api'}),
  cache: new InMemoryCache()
})

// comps
import Application from './comps/Application'

// scss
import './scss/main'

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
