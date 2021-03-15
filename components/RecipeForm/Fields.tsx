import * as React from "react";
import { Box, Button, FormField, Grid, TextArea, TextInput } from "grommet";
import { Ingredient, Recipe, RecipeInput } from "../../typings/graphql";
import { UseRecipe } from "../../hooks/useRecipe";
import { IngredientForm } from "../IngredientForm";

export type Props = {
  recipeId: Recipe["id"] | null;
  recipe?: RecipeInput;
  handleNameChange: React.ChangeEventHandler;
  handleIngredientChange: (passedIngredient: Ingredient) => void;
  handleIngredientDelete: (passedId: Ingredient["id"]) => void;
  handleAddIngredient: (newIngredientName: Ingredient["name"]) => void;
  updateRecipe: ReturnType<UseRecipe>["updateRecipe"]["mutate"];
  addRecipe: ReturnType<UseRecipe>["addRecipe"]["mutate"];
};

export const Fields: React.FC<Props> = ({
  recipeId,
  recipe,
  handleNameChange,
  handleIngredientChange,
  handleIngredientDelete,
  handleAddIngredient,
  updateRecipe,
  addRecipe,
}) => {
  const [newIngredientName, setNewIngredientName] = React.useState("");

  return (
    <>
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
        <FormField name="name" label="Recipe name">
          <TextInput
            aria-label="Recipe name"
            name="recipe_name"
            value={recipe?.name || ""}
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
              onClick={() => {
                handleAddIngredient(newIngredientName);
                setNewIngredientName("");
              }}
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
        <Button type="reset" label="Cancel" />
      </Box>
    </>
  );
};
