import { admin } from '../firebaseSingleton'

const fireStore = admin.firestore()

async function getFoodInfo() {
  const foods = fireStore.collection('provisions').doc('food')
  const getDoc = await foods.get().catch(err => {
    throw new Error(err)
  })

  const foodObj = getDoc.data()

  return Object.keys(foodObj).reduce((acc, curr) => {
    let food = {
      name: curr,
      inStock: foodObj[curr]['inStock']
    }

    return acc.concat(food)

  }, [])
}


const resolveFunctions = {
  Query: {
    foodSupply() {
      return getFoodInfo()
    }
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
