const admin     = require('firebase-admin')
const functions = require('firebase-functions')
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

admin.initializeApp(getCredentials())
const fireStore = admin.firestore()

async function getFoodInfo() {
  const foods = fireStore.collection('provisions').doc('food')
  const getDoc = await foods.get().catch(err => {
    throw new Error(err)
  })

  const foodObj = await getDoc.data()

  const result = Object.keys(foodObj).reduce((acc, curr) => {
    let food = {
      name: curr,
      inStock: foodObj[curr]['inStock']
    }

    return acc.concat(food)

  }, [])
}

getFoodInfo()
