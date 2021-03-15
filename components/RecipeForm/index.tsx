import * as React from "react";
import {
  Box,
  Button,
  FormField,
  Grid,
  Heading,
  TextArea,
  TextInput,
} from "grommet";
import { nanoid } from "nanoid";
import { Spacer } from "../styles";
import { IngredientForm } from "../IngredientForm";
import { useRecipe } from "../../hooks/useRecipe";
import {
  Ingredient,
  Measurement,
  Recipe,
  RecipeInput,
} from "../../typings/graphql";
import { CenteredMain } from "../Page/styles";

export const RecipeForm: React.FC = () => {
  const [recipeId, setRecipeId] = React.useState<Recipe["id"]>();
  const [recipe, setRecipe] = React.useState<RecipeInput>();
  const [newIngredientName, setNewIngredientName] = React.useState("");

  const {
    addRecipe: { mutate: addRecipe, data: addRecipeData, status, error },
  } = useRecipe([]);

  React.useEffect(() => {
    if (!addRecipeData) return;
    const [{ id, ...storedRecipe }] = addRecipeData.addRecipe.recipes;

    setRecipeId(id);
    setRecipe(storedRecipe);
  }, [addRecipeData]);

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

  const handleAddIngredient = React.useCallback(async () => {
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
    setNewIngredientName("");
  }, [newIngredientName, recipe]);

  return (
    <CenteredMain width="large">
      {recipeId && status === "success" ? "Saved successfully!" : null}
      {status === "error"
        ? `Could not fetch recipe from server! Error: ${error}`
        : null}
      <Heading>{recipeId ? "Update a recipe" : "Add a new recipe"}</Heading>
      <Spacer />
      <Grid
        rows={["auto", "auto", "auto"]}
        columns={["auto", "auto"]}
        gap="medium"
        areas={[
          {
            name: "ingredients",
            start: [0, 1],
            end: [1, 1],
          },
          {
            name: "instructions",
            start: [0, 2],
            end: [1, 2],
          },
        ]}
      >
        <FormField name="name" label="Name">
          <TextInput
            aria-label="Name"
            name="name"
            onChange={handleNameChange}
          />
        </FormField>
        <FormField name="thumbnail" label="Thumbnail">
          <TextInput aria-label="Thumbnail" name="thumbnail" />
        </FormField>
        <Box gridArea="ingredients">
          {recipe?.ingredients
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((ingredient, index) => (
              <IngredientForm
                index={index}
                ingredient={ingredient}
                key={`ingredient-${ingredient.id}`}
                onDelete={handleIngredientDelete}
                onChange={handleIngredientChange}
              />
            ))}
          <Box direction="row">
            <TextInput
              value={newIngredientName}
              placeholder="Add new ingredient"
              aria-label="Enter new ingredient name"
              onChange={(e) => setNewIngredientName(e.target.value)}
            />
            <Button
              type="button"
              primary
              disabled={!newIngredientName}
              title="Add new ingredient"
              label="+"
              onClick={handleAddIngredient}
            />
          </Box>
        </Box>
        <Box gridArea="instructions">
          <FormField name="intructions" label="Instructions">
            <Box
              width="large"
              height="medium"
              border={{ color: "brand", size: "small" }}
            >
              <TextArea name="intructions" fill />
            </Box>
          </FormField>
        </Box>
      </Grid>
      <Box direction="row" gap="medium">
        <Button
          type="submit"
          primary
          label="Save"
          disabled={!recipe || !!recipeId}
          onClick={async () => {
            if (!recipe) return;

            await addRecipe(recipe);
          }}
        />
        <Button type="reset" label="Cancel" />
      </Box>
    </CenteredMain>
  );
};
