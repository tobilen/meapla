import { gql } from "@apollo/client";

export const GET_RECIPE_QUERY = gql`
  query getRecipe($filter: RecipeFilter!) {
    getRecipe(filter: $filter) {
      recipes {
        id
        name
        ingredients {
          id
          name
          amount
          measurement
        }
      }
    }
  }
`;

export const ADD_RECIPE_MUTATION = gql`
  mutation addRecipe($input: [RecipeInput!]!) {
    addRecipe(input: $input) {
      recipes {
        id
        name
        ingredients {
          id
          name
          amount
          measurement
        }
      }
    }
  }
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation updateRecipe($input: RecipeUpdateInput!) {
    updateRecipe(input: $input) {
      recipes {
        id
        name
        ingredients {
          id
          name
          amount
          measurement
        }
      }
    }
  }
`;

export const DELETE_RECIPE_MUTATION = gql`
  mutation deleteRecipe($filter: RecipeFilter!) {
    deleteRecipe(filter: $filter) {
      recipes {
        id
        name
        ingredients {
          id
          name
          amount
          measurement
        }
      }
    }
  }
`;
