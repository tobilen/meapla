import { MockedResponse } from "@apollo/client/testing";
import {
  Ingredient,
  Mutation,
  MutationAddIngredientArgs,
  MutationDeleteIngredientArgs,
  MutationUpdateIngredientArgs,
} from "../typings/graphql";
import {
  ADD_INGREDIENT_MUTATION,
  DELETE_INGREDIENT_MUTATION,
  UPDATE_INGREDIENT_MUTATION,
} from "./ingredient";

export const mockAddIngredient: (
  ingredient: Ingredient
) => MockedResponse<{
  addIngredient: Mutation["addIngredient"];
}> = (ingredient) => {
  const variables: MutationAddIngredientArgs = {
    input: [
      {
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        measurement: ingredient.measurement,
      },
    ],
  };

  return {
    request: {
      query: ADD_INGREDIENT_MUTATION,
      variables,
    },
    result: {
      data: {
        addIngredient: {
          ingredients: [ingredient],
        },
      },
    },
  };
};

export const mockDeleteIngredient: (
  ingredient: Ingredient
) => MockedResponse<{
  deleteIngredient: Mutation["deleteIngredient"];
}> = (ingredient) => {
  const variables: MutationDeleteIngredientArgs = {
    filter: {
      ids: [ingredient.id],
    },
  };

  return {
    request: {
      query: DELETE_INGREDIENT_MUTATION,
      variables,
    },
    result: {
      data: {
        deleteIngredient: {
          ingredients: [ingredient],
        },
      },
    },
  };
};

export const mockUpdateIngredient: (
  ingredient: Ingredient
) => MockedResponse<{
  updateIngredient: Mutation["updateIngredient"];
}> = (ingredient) => {
  const variables: MutationUpdateIngredientArgs = {
    input: {
      filter: {
        ids: [ingredient.id],
      },
      set: {
        id: ingredient.id,
        amount: ingredient.amount,
        measurement: ingredient.measurement,
        name: ingredient.name,
      },
    },
  };

  return {
    request: {
      query: UPDATE_INGREDIENT_MUTATION,
      variables,
    },
    result: {
      data: {
        updateIngredient: {
          ingredients: [ingredient],
        },
      },
    },
  };
};
