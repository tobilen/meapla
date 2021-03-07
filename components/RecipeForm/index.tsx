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
import { useMutation } from "@apollo/client";
import { Spacer } from "../styles";
import {
  Ingredient,
  Measurement,
  MutationAddIngredientArgs,
  MutationDeleteIngredientArgs,
  MutationUpdateIngredientArgs,
} from "../../typings/graphql";
import { IngredientForm } from "./IngredientForm";
import {
  ADD_INGREDIENT_MUTATION,
  DELETE_INGREDIENT_MUTATION,
  UPDATE_INGREDIENT_MUTATION,
} from "./queries";

export const RecipeForm: React.FC = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [values, setValues] = React.useState({});
  const [newIngredient, setNewIngredient] = React.useState<string>();
  const [error, setError] = React.useState<string>();

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
    async (passedId: string) => {
      const result = await deleteIngredientMutation({
        variables: { filter: { id: [passedId] } },
      });

      if (!result.data) {
        setError("Could not delete ingredient");
        return;
      }

      const deletedIds = result.data.deleteIngredient.ingredient.map(
        ({ id }) => id
      );

      setIngredients(
        ingredients.filter(
          ({ id: currentId }) => !deletedIds.includes(currentId)
        )
      );
    },
    [deleteIngredientMutation, ingredients]
  );

  const addIngredient = React.useCallback(async () => {
    if (!newIngredient) return;
    const result = await addIngredientMutation({
      variables: {
        input: [
          {
            name: newIngredient,
            amount: 0,
            measurement: Measurement.Gramm,
          },
        ],
      },
    });

    if (!result.data) {
      setError("Could not write ingredient");
      return;
    }

    setIngredients([...ingredients, ...result.data.addIngredient.ingredient]);
  }, [addIngredientMutation, ingredients, newIngredient]);

  const updateIngredient = React.useCallback(
    async ({ id, amount, measurement, name }: Ingredient) => {
      const result = await updateIngredientMutation({
        variables: {
          input: {
            filter: { id: [id] },
            set: { amount, measurement, name },
          },
        },
      });

      if (!result.data) {
        setError("Could not write ingredient");
        return;
      }

      setIngredients([
        ...ingredients.filter(({ id: currentId }) => id !== currentId),
        ...result.data.updateIngredient.ingredient,
      ]);
    },
    [ingredients, updateIngredientMutation]
  );

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
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <Button
                type="button"
                primary
                disabled={!newIngredient}
                label="+"
                onClick={addIngredient}
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
