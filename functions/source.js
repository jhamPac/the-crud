const functions = require('firebase-functions')
const express   = require('express')
const cors      = require('cors')

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
  res.send('Yaay Its Christmas!')
})

WAF.get('/home', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Keep the change you stinkin animal!')
})

WAF.use('/', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Merry Christmas and a Happy New Year')
})

export const api = functions.https.onRequest((req, res) => {
	if (!req.path) {
		req.url = `/${req.url}`
	}

	return WAF(req, res)
})
