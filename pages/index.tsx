import * as React from "react";
import { NextComponentType } from "next";
import { useRecipe } from "../hooks/useRecipe";

const Index: NextComponentType = () => {
  const { data, status, refetch } = useRecipe();

  React.useEffect(() => {
    refetch().catch((e) => {
      throw e;
    });
  }, [refetch]);

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
