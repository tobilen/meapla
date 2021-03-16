import { NextComponentType } from "next";
import { Heading, Main } from "grommet";
import { RecipeList } from "../components/RecipeList";

const Recipes: NextComponentType = () => (
  <Main>
    <Heading>Recipe Overview</Heading>
    <RecipeList />
  </Main>
);

export default Recipes;
