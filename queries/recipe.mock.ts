import { MockedResponse } from "@apollo/client/testing";
import {
  Recipe,
  Mutation,
  MutationAddRecipeArgs,
  MutationDeleteRecipeArgs,
  MutationUpdateRecipeArgs,
  Query,
  QueryGetRecipeArgs,
} from "../typings/graphql";
import {
  ADD_RECIPE_MUTATION,
  DELETE_RECIPE_MUTATION,
  GET_RECIPE_QUERY,
  UPDATE_RECIPE_MUTATION,
} from "./recipe";

export const mockGetRecipe: (
  recipe: Recipe
) => MockedResponse<{
  getRecipe: Query["getRecipe"];
}> = (recipe) => {
  const variables: QueryGetRecipeArgs = {
    filter: { ids: [recipe.id] },
  };

  return {
    request: {
      query: GET_RECIPE_QUERY,
      variables,
    },
    result: {
      data: {
        getRecipe: {
          recipes: [recipe],
        },
      },
    },
  };
};

export const mockGetRecipeEmpty: MockedResponse<{
  getRecipe: Query["getRecipe"];
}> = {
  request: {
    query: GET_RECIPE_QUERY,
    variables: { filter: { ids: [] } },
  },
  result: {
    data: {
      getRecipe: {
        recipes: [],
      },
    },
  },
};

export const mockAddRecipe: (
  recipe: Recipe
) => MockedResponse<{
  addRecipe: Mutation["addRecipe"];
}> = (recipe) => {
  const variables: MutationAddRecipeArgs = {
    input: [
      {
        name: recipe.name,
        ingredients: recipe.ingredients,
      },
    ],
  };

  return {
    request: {
      query: ADD_RECIPE_MUTATION,
      variables,
    },
    result: {
      data: {
        addRecipe: {
          recipes: [recipe],
        },
      },
    },
  };
};

export const mockDeleteRecipe: (
  recipe: Recipe
) => MockedResponse<{
  deleteRecipe: Mutation["deleteRecipe"];
}> = (recipe) => {
  const variables: MutationDeleteRecipeArgs = {
    filter: {
      ids: [recipe.id],
    },
  };

  return {
    request: {
      query: DELETE_RECIPE_MUTATION,
      variables,
    },
    result: {
      data: {
        deleteRecipe: {
          recipes: [recipe],
        },
      },
    },
  };
};

export const mockUpdateRecipe: (
  recipe: Recipe
) => MockedResponse<{
  updateRecipe: Mutation["updateRecipe"];
}> = (recipe) => {
  const variables: MutationUpdateRecipeArgs = {
    input: {
      filter: {
        ids: [recipe.id],
      },
      set: {
        name: recipe.name,
        ingredients: recipe.ingredients,
      },
    },
  };

  return {
    request: {
      query: UPDATE_RECIPE_MUTATION,
      variables,
    },
    result: {
      data: {
        updateRecipe: {
          recipes: [recipe],
        },
      },
    },
  };
};
