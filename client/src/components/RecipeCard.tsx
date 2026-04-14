import { Recipe } from "../types";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => (
  <div>
  <div className="header">
    <p className="recipeTitle">{recipe.title}</p>
    <button className="addButton">+</button>
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