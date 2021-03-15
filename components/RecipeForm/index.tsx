import * as React from "react";
import { useRouter } from "next/router";
import { Box, Button, Heading } from "grommet";
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
  const { push } = useRouter();
  const [recipeId, setRecipeId] = React.useState<Recipe["id"] | null>(
    recipeIdProp
  );
  const [recipe, setRecipe] = React.useState<RecipeInput>();

  const {
    data: [fetchedRecipe],
    updateRecipe: {
      mutate: updateRecipe,
      status: updateRecipeStatus,
      error: updateRecipeError,
    },
    addRecipe: {
      mutate: addRecipe,
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
    if (updateRecipeStatus === "success")
      push("/").catch((e) => {
        throw e;
      });
  }, [push, updateRecipeStatus]);

  React.useEffect(() => {
    if (addRecipeStatus === "success")
      push("/").catch((e) => {
        throw e;
      });
  }, [push, addRecipeStatus]);

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
      {addRecipeStatus === "error"
        ? `Could not create recipe! Error: ${addRecipeError}`
        : null}
      {updateRecipeStatus === "error"
        ? `Could not update recipe! Error: ${updateRecipeError}`
        : null}
      <Heading>{recipeId ? "Update a recipe" : "Add a new recipe"}</Heading>
      <Spacer />
      <Fields
        handleAddIngredient={handleAddIngredient}
        handleIngredientChange={handleIngredientChange}
        handleIngredientDelete={handleIngredientDelete}
        handleNameChange={handleNameChange}
        recipe={recipe}
      />
      <Box direction="row" gap="medium">
        <Button
          primary
          label={recipeId ? "Update" : "Create"}
          disabled={!recipe}
          onClick={async () => {
            if (!recipe) return;

            if (recipeId) {
              await updateRecipe({ ...recipe, id: recipeId });
            } else {
              await addRecipe(recipe);
            }
          }}
        />
        <Button type="reset" label="Cancel" href="/" />
      </Box>
    </CenteredMain>
  );
};
