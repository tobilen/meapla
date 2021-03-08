import * as React from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Heading,
  Main,
  Text,
  TextArea,
  TextInput,
} from "grommet";
import { Spacer } from "../styles";
import { IngredientForm } from "../IngredientForm";
import { useIngredient } from "../../hooks/useIngredient";

export const RecipeForm: React.FC = () => {
  const [values, setValues] = React.useState({});
  const [newIngredientName, setNewIngredientName] = React.useState<string>();
  const {
    status: ingredientStatus,
    data: ingredients,
    error,
    addIngredient,
    updateIngredient,
    deleteIngredient,
  } = useIngredient();

  return (
    <Main>
      {error && <Text color="error">{error}</Text>}
      <Heading>Add a new recipe</Heading>
      <Spacer />
      <Form
        value={values}
        onChange={(nextValue) => {
          console.log("changed values", nextValue);
          setValues(nextValue as Record<string, unknown>);
        }}
        onReset={() => setValues({})}
      >
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
            <TextInput name="name" />
          </FormField>
          <FormField name="thumbnail" label="Thumbnail">
            <TextInput name="thumbnail" />
          </FormField>
          <Box gridArea="ingredients">
            {ingredients.map((ingredient, index) => (
              <IngredientForm
                index={index}
                ingredient={ingredient}
                key={`ingredient-${ingredient.id}`}
                onDelete={deleteIngredient}
                onChange={updateIngredient}
              />
            ))}
            <Box direction="row">
              <TextInput
                placeholder="Add new ingredient"
                onChange={(e) => setNewIngredientName(e.target.value)}
              />
              <Button
                type="button"
                primary
                disabled={!newIngredientName || ingredientStatus === "loading"}
                label="+"
                onClick={async () => {
                  await addIngredient(newIngredientName || null);
                  setNewIngredientName(undefined);
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
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </Main>
  );
};
