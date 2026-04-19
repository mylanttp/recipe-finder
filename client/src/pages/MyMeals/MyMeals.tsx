import { useNavigate } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay";
import { Recipe } from "../../types";

type myMealsProps = {
    myRecipeList: Recipe[],
    addRecipe: (recipe: Recipe) => Promise<boolean>
    removeRecipe: (recipe: Recipe) => Promise<boolean>
}

export default function MyMeals({myRecipeList, addRecipe, removeRecipe}: myMealsProps) {
    const navigate = useNavigate();

    return ( 
        <div>
            <h2>MyMeals Page</h2>
            <button onClick={() => navigate('/')}>back to search</button>
            <RecipeDisplay recipeList={myRecipeList} onAdd={addRecipe} onRemove={removeRecipe}/>
        </div> 
    )
}