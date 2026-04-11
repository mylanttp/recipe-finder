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

  <p>Ingredients:</p>
  <ul className="ingredients">
    {recipe.ingredients?.map((ingredient, index) => (
      <li key={index}>
        {ingredient}
      </li>
    ))}
  </ul>

  <div className="footer">
    <button className="seeMore">See more</button>
  </div>
</div>
);

export default RecipeCard;