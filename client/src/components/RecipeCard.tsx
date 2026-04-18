import { Recipe } from "../types";

type RecipeCardProps = {
  recipe: Recipe;
  onAdd: (recipe: Recipe) => Promise<boolean>
};

const RecipeCard = ({recipe, onAdd}: RecipeCardProps) => (

  <div>
  <div className="header">
    <p className="recipeTitle">{recipe.title}</p>
    <button className="addButton" onClick={() => onAdd(recipe)}>+</button>
  </div>

  <div className="imageBox">
      <img className="recipeImage" src={recipe.image} alt={`${recipe.title} image`}></img>
  </div>

  <div className="footer">
    <button className="seeMore">See more</button>
  </div>
</div>
);

export default RecipeCard;