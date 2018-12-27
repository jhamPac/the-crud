const admin     = require('firebase-admin')
const functions = require('firebase-functions')

// GraphQL
import { ApolloServer }   from 'apollo-server-cloud-functions'
import schema             from './graphql/schema'

const gqlServer = new ApolloServer({
  ...schema,
  playground: true
})

// FireBase setup
admin.initializeApp(functions.config().firebase)

// export Firebase function handler
export const api = functions.https.onRequest(gqlServer.createHandler({
  cors: {
    origin: '*'
  }
}))
