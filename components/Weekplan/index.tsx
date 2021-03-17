import * as React from "react";
import { Main } from "grommet";
import { Temporal } from "proposal-temporal";
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
      Selected {selectedRecipes.length} / 7 Recipes
    </Main>
  );
};
