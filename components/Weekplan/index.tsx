import * as React from "react";
import { Button, Main, Text } from "grommet";
import { Temporal } from "proposal-temporal";
import { RecipeList } from "../RecipeList";
import { Recipe } from "../../typings/graphql";

export type Props = {
  days: [
    Temporal.PlainDate,
    Temporal.PlainDate,
    Temporal.PlainDate,
    Temporal.PlainDate,
    Temporal.PlainDate,
    Temporal.PlainDate,
    Temporal.PlainDate
  ];
};

export const Weekplan: React.FC<Props> = () => {
  const [selectedRecipes, setSelectedRecipes] = React.useState<Recipe[]>([]);
  return (
    <Main pad="large">
      <Text color={selectedRecipes.length > 7 ? "status-error" : undefined}>
        Selected {selectedRecipes.length} / 7 Recipes
      </Text>
      <Button
        label="Save"
        disabled={selectedRecipes.length < 1 || selectedRecipes.length > 7}
        primary
      />
      <RecipeList selectable onRecipeSelect={setSelectedRecipes} />
    </Main>
  );
};
