import { admin } from '../firebaseSingleton'

const fireStore = admin.firestore()
const FOOD_REF  = fireStore.collection('provisions').doc('food')

async function getFoodSupply() {
  const foodDoc = await FOOD_REF.get().catch(err => {
    throw new Error(err)
  })

  const foodInfo       = foodDoc.data()
  const createFoodItem = info => (acc, key, index) => {
    return acc.concat(info[key])
  }

  return Object.keys(foodInfo).reduce(createFoodItem(foodInfo), [])
}

async function addFoodToSupply(root, { label, inStock }) {
  const payload = {
    [label]: {
      label,
      inStock
    }
  }

  await FOOD_REF.update(payload)

  return payload[label]
}


const resolveFunctions = {
  Query: {
    getFoodSupply
  },

  Mutation: {
    addFoodToSupply
  }
}

export default resolveFunctions
