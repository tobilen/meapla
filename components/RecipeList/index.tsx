import * as React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Heading,
  Main,
  Text,
} from "grommet";
import { useRecipe } from "../../hooks/useRecipe";
import { AdminButton, EditIcon, TrashIcon } from "./styles";

export const RecipeList: React.FC = () => {
  const { data, status, refetch, deleteRecipe } = useRecipe();

  if (!data || status === "loading") return <>loading recipes...</>;
  return (
    <Main>
      <Heading>Recipes</Heading>
      <Grid
        rows="auto"
        columns={["medium", "medium", "medium"]}
        gap="medium"
        justifyContent="center"
      >
        {data.map((recipe) => (
          <Card key={recipe.id} height="auto" width="auto" background="light-1">
            <CardHeader pad="medium">
              <Text size="large" weight="bold">
                {recipe.name}
              </Text>
            </CardHeader>
            <CardBody pad="medium">Body</CardBody>
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
    </Main>
  );
};
