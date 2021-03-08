import * as React from "react";
import { Box, Button, FormField, Grid, Text, TextInput, Select } from "grommet";
import { Ingredient, Measurement } from "../../typings/graphql";

export const IngredientForm: React.FC<{
  index: number;
  ingredient: Ingredient;
  onDelete: (id: string) => void;
  onChange: (ingredient: Ingredient) => void;
}> = ({ index, ingredient, onDelete, onChange }) => {
  const { id, name, amount, measurement } = ingredient;
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
          name={`amount[${id}]`}
          type="number"
          value={amount}
          onChange={({ target: { valueAsNumber } }) =>
            onChange({ ...ingredient, amount: valueAsNumber })
          }
        />
      </FormField>
      <FormField name="measurement[]" label="Measurement">
        <Select
          name={`measurement[${id}]`}
          value={measurement}
          options={Object.values(Measurement)}
          onChange={({ value }) =>
            onChange({ ...ingredient, measurement: value })
          }
        />
      </FormField>
      <FormField name="ingredient[]" label="Name">
        <TextInput name={`ingredient[${id}]`} value={name} readOnly />
      </FormField>
    </Grid>
  );
};
