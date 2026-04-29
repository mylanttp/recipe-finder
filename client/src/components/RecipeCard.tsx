import { useContext } from "react";
import { RecipeContext } from "../RecipeContext";
import { Recipe } from "../types";
import { useNavigate } from "react-router-dom";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({recipe}: RecipeCardProps) => {
  const recipeInfo = useContext(RecipeContext);
  const navigate = useNavigate()


  const addOrRemove = () => {
    if(!recipe.saved){
      recipeInfo.onAdd(recipe)
    } else {
      recipeInfo.onRemove(recipe)      
    }
    recipe.saved = !recipe.saved
  }

  const seeMore = () => {
    recipeInfo.setRecipeInfo(recipe);
    navigate("/recipe");
  }

  return <div className="recipeCard">
      <div className="header">
        <p className="recipeTitle">{recipe.title}</p>
        <button className={!recipe.saved? "addButton" : "removeButton"} 
          onClick={() => addOrRemove()}>{!recipe.saved? "+" : "-"}</button>
      </div>

      <div className="imageBox">
          <img className="recipeImage" src={recipe.image} alt={`${recipe.title} image`}></img>
      </div>

      <div className="footer">
        <button className="seeMore" onClick={seeMore}>See more</button>
      </div>
  </div>
};

export default RecipeCard;