import React     from 'react'
import { Query } from 'react-apollo'
import gql       from 'graphql-tag'

const GET_FOOD_SUPPLY = gql`
  {
    getFoodSupply {
      label
      inStock
    }
  }
`
export default function FoodSupply() {
  return(
    <Query query={GET_FOOD_SUPPLY}>
    {
      ({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {
              data.getFoodSupply.map((food, index) => {
                return(
                  <li key={index}>
                    <p>{food.label}</p>
                    <span>{food.inStock}</span>
                  </li>
                )
              })
            }
          </ul>
        );
      }
    }
  </Query>
  )
}
