const admin     = require('firebase-admin')
const functions = require('firebase-functions')
const express   = require('express')
const cors      = require('cors')
const os        = require('os')

// FireStore
const serviceKeys = require(`${os.homedir()}/.firebase/keyfile.json`)
const adminCreds  = {
  credential: admin.credential.cert(serviceKeys),
  databaseURL: "https://blackjynxy.firebaseio.com"
}

const adminConfig = (process.env.LOCAL_TEST) ? adminCreds : functions.config().firebase

admin.initializeApp(adminConfig)
const DB = admin.firestore()

// GraphQL deps
const apolloServerExpress = require('apollo-server-express')
const schemaPrinter       = require('graphql/utilities/schemaPrinter')
// const schema              = require('./graphql/schema')

// W.eb A.pplication F.ramework
const WAF = express()
WAF.options('*', cors())

WAF.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return next()
})

WAF.get('/celebrate', (req, res) => {
  const foods = DB.collection('provisions').doc('food')
  const getDoc = foods.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
  res.send('Yaaaaay it was Christmas!')
})

WAF.get('/home', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Keep the change you stinkin animal!')
})

WAF.use('/', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Merry Christmas and a Happy New Year')
})

if (process.env.LOCAL_TEST) {
  WAF.listen(3000, () => console.log(`Example app listening on port 3000`))
}

export const api = functions.https.onRequest((req, res) => {
	if (!req.path) {
		req.url = `/${req.url}`
	}

	return WAF(req, res)
})
