import { functions } from './firebaseSingleton'

// GraphQL
import { ApolloServer }   from 'apollo-server-cloud-functions'
import schema             from './graphql/schema'

const gqlServer = new ApolloServer({
  ...schema,
  playground: true
})

// export Firebase function handler
export const api = functions.https.onRequest(gqlServer.createHandler({
  cors: {
    origin: '*'
  }
}))
