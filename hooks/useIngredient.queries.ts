import { gql } from "@apollo/client";

export const ADD_INGREDIENT_MUTATION = gql`
  mutation addIngredient($input: [AddIngredientInput!]!) {
    addIngredient(input: $input) {
      ingredient {
        id
        name
        amount
        measurement
      }
    }
  }
`;

export const UPDATE_INGREDIENT_MUTATION = gql`
  mutation updateIngredient($input: UpdateIngredientInput!) {
    updateIngredient(input: $input) {
      ingredient {
        id
        name
        amount
        measurement
      }
    }
  }
`;

export const DELETE_INGREDIENT_MUTATION = gql`
  mutation deleteIngredient($filter: IngredientFilter!) {
    deleteIngredient(filter: $filter) {
      ingredient {
        id
        name
        amount
        measurement
      }
    }
  }
`;
