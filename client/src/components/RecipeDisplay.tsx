import { Recipe } from "../types";
import RecipeCard from "./RecipeCard";
import "../styles/recipeCardStyle.css"

type RecipeListProps = {
    recipeList: Recipe[]
}

const RecipeDisplay = ({recipeList}: RecipeListProps) => {
    return (
    <div className="recipesContainer">
      {recipeList.length > 0 &&
        recipeList.map((recipe: Recipe) => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe}/>
          </div>
        ))}
    </div>
  );
};

export default RecipeDisplay;
