import * as React from "react";
import { Box, Button, FormField, Grid, Text, TextInput, Select } from "grommet";
import { Ingredient, Measurement } from "../../typings/graphql";

export type Props = {
  index: number;
  ingredient: Ingredient;
  onDelete: (id: Ingredient["id"]) => void;
  onChange: (ingredient: Ingredient) => void;
};

export const IngredientForm: React.FC<Props> = ({
  index,
  ingredient: ingredientProp,
  onDelete,
  onChange,
}) => {
  const [ingredient, setIngredient] = React.useState(ingredientProp);
  const { id, name, amount, measurement } = ingredient;

  React.useEffect(() => {
    setIngredient(ingredientProp);
  }, [ingredientProp]);

  if (!name) return null;
  if (amount === null) return null;
  if (!measurement) return null;

  return (
    <Grid
      rows={["auto", "auto"]}
      columns={["auto", "auto", "auto"]}
      gap="small"
      areas={[{ name: "header", start: [0, 0], end: [2, 0] }]}
    >
      <Box gridArea="header" direction="row" gap="small">
        <Text>Ingredient {index + 1}</Text>
        <Button
          type="button"
          plain
          onClick={() => onDelete(id)}
          label="(Delete)"
        />
      </Box>
      <FormField name="amount[]" label="Amount">
        <TextInput
          aria-label="Amount"
          name={`amount[${id}]`}
          type="number"
          value={amount}
          onChange={({ target: { valueAsNumber } }) => {
            const changedIngredient: Ingredient = {
              ...ingredient,
              amount: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
            };
            setIngredient(changedIngredient);
            onChange(changedIngredient);
          }}
        />
      </FormField>
      <FormField name={`measurement[${id}]`} label="Measurement">
        <Select
          aria-label="Measurement"
          name={`measurement[${id}]`}
          value={measurement}
          options={Object.values(Measurement)}
          onChange={({ value }) => {
            const changedIngredient: Ingredient = {
              ...ingredient,
              measurement: value,
            };
            setIngredient(changedIngredient);
            onChange(changedIngredient);
          }}
        />
      </FormField>
      <FormField name="ingredient[]" label="Name">
        <TextInput
          aria-label="Name"
          name={`ingredient[${id}]`}
          value={name}
          readOnly
        />
      </FormField>
    </Grid>
  );
};
