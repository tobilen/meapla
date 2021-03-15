import * as React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Heading,
  Main,
  Text,
} from "grommet";
import * as Icons from "grommet-icons";
import { useRecipe } from "../../hooks/useRecipe";

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
              <Button
                a11yTitle={`Edit ${recipe.name}`}
                aria-label={`Edit ${recipe.name}`}
                icon={<Icons.Edit color="plain" />}
                hoverIndicator
              />
              <Button
                a11yTitle={`Delete ${recipe.name}`}
                aria-label={`Delete ${recipe.name}`}
                icon={
                  <Icons.Trash
                    color="red"
                    onClick={async () => {
                      await deleteRecipe.mutate(recipe.id);
                      await refetch();
                    }}
                  />
                }
                hoverIndicator
              />
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Main>
  );
};
