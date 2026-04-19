import { useState } from "react";
import { Recipe } from "../types";

type RecipeCardProps = {
  recipe: Recipe;
  onAdd: (recipe: Recipe) => Promise<boolean>
  onRemove: (recipe: Recipe) => Promise<boolean>
};

const RecipeCard = ({recipe, onAdd, onRemove}: RecipeCardProps) => {
  const [add, setAdd] = useState(true);
  const addOrRemove = () => {
    if(add){
      onAdd(recipe)
      setAdd(false)
    } else {
      onRemove(recipe)
      setAdd(true)
    }
  }

  return <div>
      <div className="header">
        <p className="recipeTitle">{recipe.title}</p>
        <button className="addButton" onClick={() => addOrRemove()}>+</button>
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