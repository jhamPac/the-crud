import { functions } from './firebaseSingleton'

// GraphQL
import { ApolloServer } from 'apollo-server-cloud-functions'
import schema           from './graphql/schema'

const gqlServer = new ApolloServer({
  ...schema,
  playground: true
})

// graphql endpoint
export const api = functions.https.onRequest(gqlServer.createHandler({
  cors: {
    origin: '*'
  }
}))

// firestore onWrite trigger
export const vulcan = functions.firestore.document('provisions/food').onWrite((change, context) => {
  console.log(change.before.data())
  console.log(change.after.data())
})
