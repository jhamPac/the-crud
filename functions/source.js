const admin     = require('firebase-admin')
const functions = require('firebase-functions')
const os        = require('os')

// GraphQL
import { ApolloServer }   from 'apollo-server-cloud-functions'
import schema             from './graphql/schema'

const gqlServer = new ApolloServer({
  ...schema,
  playground: true
})

// FireBase setup
function getCredentials() {
  const serviceKeys = require(`${os.homedir()}/.firebase/keyfile.json`)
  const adminCreds  = {
    credential: admin.credential.cert(serviceKeys),
    databaseURL: "https://blackjynxy.firebaseio.com"
  }

  return adminCreds
}

const fbConfig = (process.env.LOCAL_TEST) ? getCredentials() : functions.config().firebase
admin.initializeApp(fbConfig)


// export Firebase function handler
export const api = functions.https.onRequest(gqlServer.createHandler({
  cors: {
    origin: '*'
  }
}))
