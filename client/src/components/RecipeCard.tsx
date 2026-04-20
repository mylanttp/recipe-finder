import { useContext } from "react";
import { RecipeContext } from "../RecipeContext";
import { Recipe } from "../types";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({recipe}: RecipeCardProps) => {
  const recipeInfo = useContext(RecipeContext);

  const addOrRemove = () => {
    if(!recipe.saved){
      recipeInfo.onAdd(recipe)
    } else {
      recipeInfo.onRemove(recipe)      
    }
    recipe.saved = !recipe.saved
  }

  return <div>
      <div className="header">
        <p className="recipeTitle">{recipe.title}</p>
        <button className={!recipe.saved? "addButton" : "removeButton"} 
          onClick={() => addOrRemove()}>{!recipe.saved? "+" : "-"}</button>
      </div>

      <div className="imageBox">
          <img className="recipeImage" src={recipe.image} alt={`${recipe.title} image`}></img>
      </div>

      <div className="footer">
        <button className="seeMore">See more</button>
      </div>
  </div>
};

export default RecipeCard;