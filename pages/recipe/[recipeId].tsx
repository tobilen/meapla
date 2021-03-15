import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { RecipeForm } from "../../components/RecipeForm";

const parseId = (recipeId: string | string[] | undefined): number | null => {
  if (!recipeId) return null;
  if (Array.isArray(recipeId)) return null;
  return parseInt(recipeId, 10);
};

const EditRecipe: NextComponentType = () => {
  const router = useRouter();
  const { recipeId } = router.query;

  return <RecipeForm id={parseId(recipeId)} />;
};

export default EditRecipe;
