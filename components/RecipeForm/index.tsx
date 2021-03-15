import * as React from "react";
import { Heading } from "grommet";
import { nanoid } from "nanoid";
import { Spacer } from "../styles";
import { useRecipe } from "../../hooks/useRecipe";
import {
  Ingredient,
  Measurement,
  Recipe,
  RecipeInput,
} from "../../typings/graphql";
import { CenteredMain } from "../Page/styles";
import { Fields } from "./Fields";

export type Props = {
  id: Recipe["id"] | null;
};

export const RecipeForm: React.FC<Props> = ({ id: recipeIdProp }) => {
  const [recipeId, setRecipeId] = React.useState<Recipe["id"] | null>(
    recipeIdProp
  );
  const [recipe, setRecipe] = React.useState<RecipeInput>();

  const {
    data: [fetchedRecipe],
    updateRecipe: {
      mutate: updateRecipe,
      data: updateRecipeData,
      status: updateRecipeStatus,
      error: updateRecipeError,
    },
    addRecipe: {
      mutate: addRecipe,
      data: addRecipeData,
      status: addRecipeStatus,
      error: addRecipeError,
    },
  } = useRecipe(recipeId ? [recipeId] : []);

  React.useEffect(() => {
    setRecipeId(recipeIdProp);
  }, [recipeIdProp]);

  React.useEffect(() => {
    setRecipe(fetchedRecipe);
  }, [fetchedRecipe]);

  React.useEffect(() => {
    if (!addRecipeData) return;
    const [{ id, ...storedRecipe }] = addRecipeData.addRecipe.recipes;

    setRecipeId(id);
    setRecipe(storedRecipe);
  }, [addRecipeData]);

  React.useEffect(() => {
    if (!updateRecipeData) return;
    const [{ id, ...storedRecipe }] = updateRecipeData.updateRecipe.recipes;

    setRecipeId(id);
    setRecipe(storedRecipe);
  }, [updateRecipeData]);

  const handleIngredientChange = React.useCallback(
    (passedIngredient: Ingredient) => {
      setRecipe({
        ...recipe,
        ingredients: [
          ...(recipe?.ingredients || []).filter(
            (currentIngredient) => currentIngredient.id !== passedIngredient.id
          ),
          passedIngredient,
        ],
      });
    },
    [recipe]
  );

  const handleIngredientDelete = React.useCallback(
    (passedId: Ingredient["id"]) => {
      setRecipe({
        ...recipe,
        ingredients: (recipe?.ingredients || []).filter(
          (currentIngredient) => currentIngredient.id !== passedId
        ),
      });
    },
    [recipe]
  );

  const handleNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRecipe({
        ...recipe,
        name: e.target.value,
        ingredients: recipe?.ingredients || [],
      });
    },
    [recipe]
  );

  const handleAddIngredient = React.useCallback(
    async (newIngredientName: string) => {
      setRecipe({
        ...recipe,
        ingredients: [
          ...(recipe?.ingredients || []),
          {
            id: nanoid(),
            name: newIngredientName,
            amount: 0,
            measurement: Measurement.Gramm,
          },
        ],
      });
    },
    [recipe]
  );

  return (
    <CenteredMain width="large">
      {recipeId && addRecipeStatus === "success" ? "Saved successfully!" : null}
      {recipeId && updateRecipeStatus === "success"
        ? "Updated successfully!"
        : null}
      {addRecipeStatus === "error"
        ? `Could not create recipe! Error: ${addRecipeError}`
        : null}
      {updateRecipeStatus === "error"
        ? `Could not update recipe! Error: ${updateRecipeError}`
        : null}
      <Heading>{recipeId ? "Update a recipe" : "Add a new recipe"}</Heading>
      <Spacer />
      <Fields
        addRecipe={addRecipe}
        handleAddIngredient={handleAddIngredient}
        handleIngredientChange={handleIngredientChange}
        handleIngredientDelete={handleIngredientDelete}
        handleNameChange={handleNameChange}
        recipeId={recipeId}
        recipe={recipe}
        updateRecipe={updateRecipe}
      />
    </CenteredMain>
  );
};
