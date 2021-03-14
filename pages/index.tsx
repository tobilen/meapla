import { NextComponentType } from "next";
import { useRecipe } from "../hooks/useRecipe";

const Index: NextComponentType = () => {
  const { data, status } = useRecipe();

  if (!data || status === "loading") return <>loading recipes...</>;
  return (
    <div>
      Recipes:{" "}
      <ul>
        {data.map((recipe) => (
          <li>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
