import * as React from "react";
import { Card, CardBody, CardFooter, CardHeader, Grid, Text } from "grommet";
import { useRecipe } from "../../hooks/useRecipe";
import { Recipe } from "../../typings/graphql";
import { AdminButton, EditIcon, TrashIcon } from "./styles";

export type Props = {
  selectable?: boolean;
  selectedRecipes?: Recipe[];
  onRecipeSelect?: (recipes: Recipe[]) => void;
};

export const RecipeList: React.FC<Props> = ({
  selectable,
  selectedRecipes: selectedRecipesProp,
  onRecipeSelect = () => {},
}) => {
  const { data, status, refetch, deleteRecipe } = useRecipe();
  const [selectedRecipes, setSelectedRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    if (!selectedRecipesProp) return;
    setSelectedRecipes(selectedRecipesProp);
  }, [selectedRecipesProp]);

  const isSelected = React.useCallback(
    (recipe: Recipe) =>
      selectedRecipes.some((currentRecipe) => currentRecipe.id === recipe.id),
    [selectedRecipes]
  );

  const handleRecipeClick = React.useCallback(
    (recipe: Recipe) => {
      const newSelectedRecipes = isSelected(recipe)
        ? selectedRecipes.filter(
            (currentRecipe) => currentRecipe.id !== recipe.id
          )
        : [...selectedRecipes, recipe];

      setSelectedRecipes(newSelectedRecipes);
      onRecipeSelect(newSelectedRecipes);
    },
    [isSelected, onRecipeSelect, selectedRecipes]
  );

  if (!data || status === "loading") return <>loading recipes...</>;
  return (
    <Grid
      rows="auto"
      columns={["medium", "medium", "medium"]}
      gap="medium"
      justifyContent="center"
    >
      {data.map((recipe) => (
        <Card
          key={recipe.id}
          height="auto"
          width="auto"
          background="light-1"
          role={selectable ? "checkbox" : undefined}
          aria-label={`${recipe.name}`}
          aria-checked={selectable && isSelected(recipe)}
          border={selectable && isSelected(recipe)}
        >
          <CardHeader
            pad="medium"
            onClick={selectable ? () => handleRecipeClick(recipe) : undefined}
          >
            <Text size="large" weight="bold">
              {recipe.name}
            </Text>
          </CardHeader>
          <CardBody
            pad="medium"
            onClick={selectable ? () => handleRecipeClick(recipe) : undefined}
          >
            Body
          </CardBody>
          <CardFooter pad={{ horizontal: "small" }} background="light-2">
            <AdminButton
              color="dark-5"
              hoverColor="brand"
              href={`recipe/${recipe.id}`}
              a11yTitle={`Edit ${recipe.name}`}
              aria-label={`Edit ${recipe.name}`}
              icon={<EditIcon />}
            />
            <AdminButton
              color="dark-5"
              hoverColor="neutral-4"
              a11yTitle={`Delete ${recipe.name}`}
              aria-label={`Delete ${recipe.name}`}
              onClick={async () => {
                await deleteRecipe.mutate(recipe.id);
                await refetch();
              }}
              icon={<TrashIcon />}
            />
          </CardFooter>
        </Card>
      ))}
    </Grid>
  );
};
