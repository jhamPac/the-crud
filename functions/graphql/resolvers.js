import { admin } from '../firebaseSingleton'

const fireStore = admin.firestore()

async function foodSupply() {
  const foodRef = fireStore.collection('provisions').doc('food')
  const foodDoc = await foodRef.get().catch(err => {
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


const resolveFunctions = {
  Query: {
    foodSupply
  }
  // Mutation: {
  //   upvotePost(_, { postId }) {
  //     const post = posts.find(post => post.id === postId)
  //     if (!post) {
  //       throw new Error(`Couldn't find post with id ${postId}`)
  //     }
  //     post.votes += 1
  //     // pubsub.publish('postUpvoted', post);
  //     return post
  //   }
  // }
}

export default resolveFunctions
