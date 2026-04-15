import { Recipe, RecipeList } from "../types";
import RecipeCard from "./RecipeCard";
import "../styles/recipeCardStyle.css"


type RecipeListProps = {
    recipeList: RecipeList
}

const RecipeDisplay = ({recipeList}: RecipeListProps) => {
    return (
    <div className='recipeContainer'>
      {recipeList.list.map((recipe: Recipe) => (
        <div className='recipeCard' key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipeDisplay;
