import { gql } from "@apollo/client";

export const ADD_INGREDIENT_MUTATION = gql`
  mutation addIngredient($input: [IngredientInput!]!) {
    addIngredient(input: $input) {
      id
      name
      amount
      measurement
    }
  }
`;

export const UPDATE_INGREDIENT_MUTATION = gql`
  mutation updateIngredient($input: IngredientUpdateInput!) {
    updateIngredient(input: $input) {
      id
      name
      amount
      measurement
    }
  }
`;

export const DELETE_INGREDIENT_MUTATION = gql`
  mutation deleteIngredient($filter: IngredientFilter!) {
    deleteIngredient(filter: $filter) {
      id
      name
      amount
      measurement
    }
  }
`;
