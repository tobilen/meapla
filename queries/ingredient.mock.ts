import { MockedResponse } from "@apollo/client/testing";
import {
  Ingredient,
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
  addIngredient: { ingredient: Ingredient[] };
}> = (ingredient) => {
  const variables: MutationAddIngredientArgs = {
    input: [
      {
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
          ingredient: [ingredient],
        },
      },
    },
  };
};

export const mockDeleteIngredient: (
  ingredient: Ingredient
) => MockedResponse<{
  deleteIngredient: { ingredient: Ingredient[] };
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
          ingredient: [ingredient],
        },
      },
    },
  };
};

export const mockUpdateIngredient: (
  ingredient: Ingredient
) => MockedResponse<{
  updateIngredient: { ingredient: Ingredient[] };
}> = (ingredient) => {
  const variables: MutationUpdateIngredientArgs = {
    input: {
      filter: {
        ids: [ingredient.id],
      },
      set: {
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
          ingredient: [ingredient],
        },
      },
    },
  };
};
