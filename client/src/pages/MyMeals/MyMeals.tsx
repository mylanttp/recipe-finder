import { useNavigate } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay";
import { useContext } from "react";
import { RecipeContext } from "../../RecipeContext";

export default function MyMeals() {
    const navigate = useNavigate();
    const recipeInfo = useContext(RecipeContext);

    return ( 
        <div>
            <h2>MyMeals Page</h2>
            <button onClick={() => navigate('/')}>back to search</button>
            {recipeInfo.myRecipeList.length === 0 && <p>No meals saved yet!</p>}
            <RecipeDisplay recipeList={recipeInfo.myRecipeList}/>
        </div> 
    )
}