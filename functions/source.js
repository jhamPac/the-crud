const functions = require("firebase-functions")
const express   = require("express")

// W.eb A.pplication F.ramework
const WAF = express()

WAF.get('*', (request, response) => {
  response.send('Merry Christmas and a happy New Year!')
})

export const api = functions.https.onRequest(WAF)
