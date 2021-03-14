import * as React from "react";
import {
  ApolloError,
  FetchResult,
  MutationResult,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  IngredientInput,
  Mutation,
  MutationAddRecipeArgs,
  MutationDeleteRecipeArgs,
  MutationUpdateRecipeArgs,
  Query,
  QueryGetRecipeArgs,
  Recipe,
  RecipeInput,
} from "../typings/graphql";
import {
  ADD_RECIPE_MUTATION,
  DELETE_RECIPE_MUTATION,
  GET_RECIPE_QUERY,
  UPDATE_RECIPE_MUTATION,
} from "../queries/recipe";

type MutationStatus = "idle" | "loading" | "error" | "success";

type AddRecipeData = {
  addRecipe: Mutation["addRecipe"];
};
type UpdateRecipeData = {
  updateRecipe: Mutation["updateRecipe"];
};
type DeleteRecipeData = {
  deleteRecipe: Mutation["deleteRecipe"];
};

type UpdateRecipeInput = RecipeInput & {
  id: number;
  ingredients: IngredientInput[];
};

type UseRecipe = (
  ids?: Recipe["id"][]
) => {
  data: Recipe[];
  error?: ApolloError;
  status: MutationStatus;
  addRecipe: {
    mutate: (recipe: RecipeInput) => Promise<FetchResult<AddRecipeData>>;
    status: MutationStatus;
  } & MutationResult<AddRecipeData>;
  updateRecipe: {
    mutate: (
      recipe: UpdateRecipeInput
    ) => Promise<FetchResult<UpdateRecipeData>>;
    status: MutationStatus;
  } & MutationResult<UpdateRecipeData>;
  deleteRecipe: {
    mutate: (passedId: Recipe["id"]) => Promise<FetchResult<DeleteRecipeData>>;
    status: MutationStatus;
  } & MutationResult<DeleteRecipeData>;
};

const getStatus = (result: MutationResult): MutationStatus => {
  if (!result.called) return "idle";
  if (result.loading) return "loading";
  if (result.error) return "error";
  return "success";
};

export const useRecipe: UseRecipe = (ids) => {
  const result = useQuery<
    { getRecipe: Query["getRecipe"] },
    QueryGetRecipeArgs
  >(GET_RECIPE_QUERY, ids && { variables: { filter: { ids } } });

  const [requestAddRecipe, addRecipeResult] = useMutation<
    AddRecipeData,
    MutationAddRecipeArgs
  >(ADD_RECIPE_MUTATION);
  const [requestUpdateRecipe, updateRecipeResult] = useMutation<
    UpdateRecipeData,
    MutationUpdateRecipeArgs
  >(UPDATE_RECIPE_MUTATION);
  const [requestDeleteRecipe, deleteRecipeResult] = useMutation<
    DeleteRecipeData,
    MutationDeleteRecipeArgs
  >(DELETE_RECIPE_MUTATION);

  const addRecipe = React.useCallback(
    (recipe: RecipeInput) =>
      requestAddRecipe({
        variables: {
          input: [recipe],
        },
      }),
    [requestAddRecipe]
  );

  const updateRecipe = React.useCallback(
    async ({ id: filterId, ...set }: UpdateRecipeInput) =>
      requestUpdateRecipe({
        variables: {
          input: {
            filter: { ids: [filterId] },
            set,
          },
        },
      }),
    [requestUpdateRecipe]
  );

  const deleteRecipe = React.useCallback(
    async (passedId: Recipe["id"]) =>
      requestDeleteRecipe({
        variables: { filter: { ids: [passedId] } },
      }),
    [requestDeleteRecipe]
  );

  return {
    data: result.data?.getRecipe?.recipes || [],
    status: getStatus(result),
    error: result.error,
    addRecipe: {
      mutate: addRecipe,
      ...addRecipeResult,
      status: getStatus(addRecipeResult),
    },
    updateRecipe: {
      mutate: updateRecipe,
      ...updateRecipeResult,
      status: getStatus(updateRecipeResult),
    },
    deleteRecipe: {
      mutate: deleteRecipe,
      ...deleteRecipeResult,
      status: getStatus(deleteRecipeResult),
    },
  };
};
