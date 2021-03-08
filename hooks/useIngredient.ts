import * as React from "react";
import { useMutation } from "@apollo/client";
import {
  Ingredient,
  Measurement,
  MutationAddIngredientArgs,
  MutationDeleteIngredientArgs,
  MutationUpdateIngredientArgs,
} from "../typings/graphql";
import {
  ADD_INGREDIENT_MUTATION,
  DELETE_INGREDIENT_MUTATION,
  UPDATE_INGREDIENT_MUTATION,
} from "./useIngredient.queries";

type MutationStatus = "idle" | "loading" | "error" | "success";

type UseIngredient = () => {
  data: Ingredient[];
  error?: string;
  status: MutationStatus;
  addIngredient: (ingredientName: Ingredient["name"]) => Promise<void>;
  updateIngredient: (ingredient: Ingredient) => Promise<void>;
  deleteIngredient: (passedId: Ingredient["id"]) => Promise<void>;
};

export const useIngredient: UseIngredient = () => {
  const [data, setData] = React.useState<Ingredient[]>([]);
  const [error, setError] = React.useState<string>();
  const [status, setStatus] = React.useState<MutationStatus>("idle");

  const [addIngredientMutation] = useMutation<
    { addIngredient: { ingredient: Ingredient[] } },
    MutationAddIngredientArgs
  >(ADD_INGREDIENT_MUTATION);
  const [deleteIngredientMutation] = useMutation<
    { deleteIngredient: { ingredient: Ingredient[] } },
    MutationDeleteIngredientArgs
  >(DELETE_INGREDIENT_MUTATION);
  const [updateIngredientMutation] = useMutation<
    { updateIngredient: { ingredient: Ingredient[] } },
    MutationUpdateIngredientArgs
  >(UPDATE_INGREDIENT_MUTATION);

  const deleteIngredient = React.useCallback(
    async (passedId: Ingredient["id"]) => {
      setStatus("loading");
      const result = await deleteIngredientMutation({
        variables: { filter: { id: [passedId] } },
      });

      if (!result.data) {
        setStatus("error");
        setError("Could not delete ingredient");
        return;
      }

      const deletedIds = result.data.deleteIngredient.ingredient.map(
        ({ id }) => id
      );

      setData(
        data.filter(({ id: currentId }) => !deletedIds.includes(currentId))
      );
      setStatus("success");
    },
    [deleteIngredientMutation, data]
  );

  const addIngredient = React.useCallback(
    async (ingredientName: Ingredient["name"]) => {
      if (!ingredientName) return;
      setStatus("loading");
      const result = await addIngredientMutation({
        variables: {
          input: [
            {
              name: ingredientName,
              amount: 0,
              measurement: Measurement.Gramm,
            },
          ],
        },
      });

      if (!result.data) {
        setStatus("error");
        setError("Could not write ingredient");
        return;
      }

      setData([...data, ...result.data.addIngredient.ingredient]);
      setStatus("success");
    },
    [addIngredientMutation, data]
  );

  const updateIngredient = React.useCallback(
    async ({ id, amount, measurement, name }: Ingredient) => {
      setStatus("loading");
      const result = await updateIngredientMutation({
        variables: {
          input: {
            filter: { id: [id] },
            set: { amount, measurement, name },
          },
        },
      });

      if (!result.data) {
        setStatus("error");
        setError("Could not write ingredient");
        return;
      }

      setData([
        ...data.filter(({ id: currentId }) => id !== currentId),
        ...result.data.updateIngredient.ingredient,
      ]);
      setStatus("success");
    },
    [data, updateIngredientMutation]
  );

  return {
    data,
    status,
    error,
    addIngredient,
    updateIngredient,
    deleteIngredient,
  };
};
