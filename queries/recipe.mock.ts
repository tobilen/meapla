import { MockedResponse } from "@apollo/client/testing";
import {
  Measurement,
  Mutation,
  MutationAddRecipeArgs,
  MutationDeleteRecipeArgs,
  MutationUpdateRecipeArgs,
  Query,
  QueryGetRecipeArgs,
  Recipe,
} from "../typings/graphql";
import {
  ADD_RECIPE_MUTATION,
  DELETE_RECIPE_MUTATION,
  GET_RECIPE_QUERY,
  UPDATE_RECIPE_MUTATION,
} from "./recipe";

const defaultRecipes: Recipe[] = [
  {
    id: 1,
    name: "Bowl of Cereal",
    ingredients: [
      {
        id: "1",
        name: "Milk",
        amount: 200,
        measurement: Measurement.Milliliters,
        __typename: "Ingredient",
      },
      {
        id: "2",
        name: "Cereal",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
  {
    id: 2,
    name: "Caesar Salat",
    ingredients: [
      {
        id: "3",
        name: "Baguette",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
      {
        id: "4",
        name: "Olivenöl",
        amount: 4,
        measurement: Measurement.Teaspoon,
        __typename: "Ingredient",
      },
      {
        id: "5",
        name: "Römersalat",
        amount: 400,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
  {
    id: 3,
    name: "Brokkolisalat",
    ingredients: [
      {
        id: "6",
        name: "Brokkoli",
        amount: 1000,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
      {
        id: "7",
        name: "Olivenöl",
        amount: 4,
        measurement: Measurement.Teaspoon,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
  {
    id: 4,
    name: "Lasagne Bolognese",
    ingredients: [
      {
        id: "8",
        name: "Mehl",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
      {
        id: "9",
        name: "Tomaten",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
  {
    id: 5,
    name: "Spinatstrudel mit Kartoffeln",
    ingredients: [
      {
        id: "10",
        name: "Spinat",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
      {
        id: "11",
        name: "Kartoffel",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
  {
    id: 6,
    name: "Paprikahuhn",
    ingredients: [
      {
        id: "12",
        name: "Paprika",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
      {
        id: "13",
        name: "Huhn",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
  {
    id: 7,
    name: "Bärlauchsuppe",
    ingredients: [
      {
        id: "14",
        name: "Bärlauch",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
      {
        id: "15",
        name: "Suppenwürfel",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
  {
    id: 8,
    name: "Thunfisch-Pizza",
    ingredients: [
      {
        id: "16",
        name: "Mehl",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
      {
        id: "17",
        name: "Thunfisch",
        amount: 200,
        measurement: Measurement.Gramm,
        __typename: "Ingredient",
      },
    ],
    __typename: "Recipe",
  },
];

export const mockGetRecipes: (input?: {
  recipes?: Recipe[];
  filter?: QueryGetRecipeArgs["filter"];
}) => MockedResponse<{
  getRecipe: Query["getRecipe"];
}> = ({ recipes, filter } = {}) => ({
  request: {
    query: GET_RECIPE_QUERY,
    variables: filter ? { filter } : undefined,
  },
  result: {
    data: {
      getRecipe: {
        __typename: "RecipeOutput",
        recipes: recipes || defaultRecipes,
      },
    },
  },
});

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
