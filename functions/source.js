const functions = require('firebase-functions')
const express   = require('express')
const cors      = require('cors')

// GraphQL deps
const apolloServerExpress = require('apollo-server-express')
const schemaPrinter       = require('graphql/utilities/schemaPrinter')
// const schema              = require('./graphql/schema')

// W.eb A.pplication F.ramework
const WAF = express()

WAF.use(cors({ origin: true }))

WAF.get('*', (req, res) => {
  console.log(req)
  response.send('Merry Christmas and a happy New Year!')
})

export const api = functions.https.onRequest((req, res) => {
  if (req.path) {
    req.url = `/${req.url}`
  }

  return WAF(req, res)
})
