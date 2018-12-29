import { admin } from '../firebaseSingleton'

const fireStore = admin.firestore()
const FOOD_REF  = fireStore.collection('provisions').doc('food')

async function getFoodSupply() {
  const foodDoc = await FOOD_REF.get().catch(err => {
    throw new Error(err)
  })

  const foodInfo       = foodDoc.data()
  const createFoodItem = info => (acc, key, index) => {
    let foodItem = {
      name: key,
      inStock: info[key]['inStock']
    }

    return acc.concat(foodItem)
  }

  return Object.keys(foodInfo).reduce(createFoodItem(foodInfo), [])
}

async function addFoodToSupply(root, { name, inStock }) {
  const payload = {
    [name]: {
      inStock
    }
  }

  await FOOD_REF.update(payload)
  payload.name = name

  return payload
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
