import * as React from "react";
import { useRouter } from "next/router";
import { Button, Main, Text } from "grommet";
import { Temporal } from "proposal-temporal";
import { RecipeList } from "../RecipeList";
import { Recipe } from "../../typings/graphql";
import { usePlan } from "../../hooks/usePlan";

export type Props = {
  from: Temporal.PlainDate;
  to: Temporal.PlainDate;
};

export const Weekplan: React.FC<Props> = ({ from, to }) => {
  const { push } = useRouter();
  const {
    data,
    status,
    addPlan: { mutate: addPlan, status: addPlanStatus },
    deletePlan: { mutate: deletePlan, status: deletePlanStatus },
  } = usePlan({
    daterange: { from: `${from}`, to: `${to}` },
  });
  const [selectedRecipes, setSelectedRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    if (addPlanStatus === "success")
      push("/").catch((e) => {
        throw e;
      });
  }, [push, addPlanStatus]);

  React.useEffect(() => {
    if (data.length < 1) return;
    setSelectedRecipes(data.map((plan) => plan.recipe));
  }, [data]);

  const handleWeekplanSave = React.useCallback(async () => {
    await deletePlan({
      daterange: { from: `${from}`, to: `${to}` },
    });
    await addPlan(
      selectedRecipes.map((selectedRecipe, days) => ({
        date: `${from.add({ days })}`,
        recipeId: selectedRecipe.id,
      }))
    );
  }, [addPlan, deletePlan, from, selectedRecipes, to]);

  if (status === "loading") return <>loading...</>;

  return (
    <Main pad="large">
      <Text color={selectedRecipes.length > 7 ? "status-error" : undefined}>
        Selected {selectedRecipes.length} / 7 Recipes
      </Text>
      {addPlanStatus === "loading" || deletePlanStatus === "loading" ? (
        <>loading...</>
      ) : (
        <Button
          label="Save"
          title="Save"
          disabled={selectedRecipes.length < 1 || selectedRecipes.length > 7}
          onClick={handleWeekplanSave}
          primary
        />
      )}
      <RecipeList
        selectable
        selectedRecipes={selectedRecipes}
        onRecipeSelect={setSelectedRecipes}
      />
    </Main>
  );
};
