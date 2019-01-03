import React    from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://us-central1-blackjynxy.cloudfunctions.net/api'}),
  cache: new InMemoryCache()
})

import './scss/main'

function Application() {
  return(
    <div>The Crud</div>
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
