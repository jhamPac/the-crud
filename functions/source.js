const functions = require('firebase-functions')
const express   = require('express')
const cors      = require('cors')

// W.eb A.pplication F.ramework
const WAF = express()

WAF.use(cors({ origin: true }))

WAF.get('*', (request, response) => {
  response.send('Merry Christmas and a happy New Year!')
})

export const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`
  }

  return WAF(request, response)
})
