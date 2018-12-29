const admin     = require('firebase-admin')
const functions = require('firebase-functions')

// FireBase setup
admin.initializeApp(functions.config().firebase)

export { admin, functions }
