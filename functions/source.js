const admin     = require('firebase-admin')
const functions = require('firebase-functions')
const express   = require('express')
const cors      = require('cors')
const os        = require('os')

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

// FireStore reference
const DB = admin.firestore()

// GraphQL deps
const apolloServerExpress = require('apollo-server-express')
const schemaPrinter       = require('graphql/utilities/schemaPrinter')
const schema              = require('./graphql/schema')

// W.eb A.pplication F.ramework
const WAF = express()
WAF.options('*', cors())

// Routes
WAF.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return next()
})

// /api/graphql
 WAF.use(
   "/graphql",
   apolloServerExpress.graphqlExpress({ schema, context: {} })
 )

 // /api/graphiql
 WAF.use(
   "/graphiql",
   apolloServerExpress.graphiqlExpress({ endpointURL: "/api/graphql" })
 )

 // /api/schema
 WAF.use("/schema", (req, res) => {
   res.set("Content-Type", "text/plain")
   res.send(schemaPrinter(schema))
 })

WAF.get('/provisions/food', async (req, res) => {
  const foods = DB.collection('provisions').doc('food')
  const getDoc = await foods.get().catch(err => {
    res.status(500)
    res.render('error', {
     message: err.message,
     error: err
    })
  })

  res.setHeader('Content-Type', 'application/json')
  res.json(getDoc.data())
})

WAF.use('/', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Welcome to data fetcher 3000!')
})

// start local server if testing locally
if (process.env.LOCAL_TEST) {
  WAF.listen(3000, () => console.log(`Example app listening on port 3000`))
}

export const api = functions.https.onRequest((req, res) => {
	if (!req.path) {
		req.url = `/${req.url}`
	}

	return WAF(req, res)
})
