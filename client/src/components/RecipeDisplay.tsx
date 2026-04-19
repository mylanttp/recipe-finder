import { Recipe } from "../types";
import RecipeCard from "./RecipeCard";
import "../styles/recipeCardStyle.css"


type RecipeListProps = {
    recipeList: Recipe[]
    onAdd: (recipe: Recipe) => Promise<boolean>
    onRemove: (recipe: Recipe) => Promise<boolean>
}

const RecipeDisplay = ({recipeList, onAdd, onRemove}: RecipeListProps) => {
    return (
    <div className='recipeContainer'>
      {recipeList.map((recipe: Recipe) => (
        <div className='recipeCard' key={recipe.id}>
          <RecipeCard recipe={recipe} onAdd={onAdd} onRemove={onRemove}/>
        </div>
      ))}
    </div>
  );
};

export default RecipeDisplay;
