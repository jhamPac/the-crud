import { gql } from 'apollo-server-cloud-functions'

import resolvers from "./resolvers"

const typeDefs = gql`
  type Food {
    id: ID!
    label: String
    inStock: Int
  }

  # the schema allows the following query:
  type Query {
    getFoodSupply: [Food]
  }

  # this schema allows the following mutation:
  type Mutation {
    addFoodToSupply(label: String!, inStock: Int!): Food
  }
`

export default {
  typeDefs,
  resolvers
}
