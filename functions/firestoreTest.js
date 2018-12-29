const admin     = require('firebase-admin')
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

async function foodSupply() {
  const foodRef = fireStore.collection('provisions').doc('food')
  const foodDoc = await foodRef.get().catch(err => {
    throw new Error(err)
  })

  const foodInfo       = foodDoc.data()
  const createFoodItem = info => (acc, curr, index) => {
    let foodItem = {
      name: curr,
      inStock: info[curr]['inStock']
    }

    return acc.concat(foodItem)
  }

  return Object.keys(foodInfo).reduce(createFoodItem(foodInfo), [])
}

foodSupply()
