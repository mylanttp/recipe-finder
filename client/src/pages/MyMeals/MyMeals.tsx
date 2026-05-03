import { useNavigate } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay";
import { useContext } from "react";
import { RecipeContext } from "../../RecipeContext";
import { Diets } from "./Diets";
import { Intolerances } from "./Intolerances";
import "../../styles/mealsStyle.css"


export default function MyMeals() {
    const navigate = useNavigate();
    const recipeInfo = useContext(RecipeContext);

    return ( 
        <div className="mealPage">
            <div className="filtersContainer">
                <p className="filterTitle">Your dietary restrictions</p>
                <div className="intoleranceSection">
                    <Intolerances databaseSave={true}/>
                </div>
                <div className="dietSection">
                    <Diets databaseSave={true}/>
                </div>
            </div>

            <div className="rightMeals">
                <div className="mealsSubtext">
                    <img className="lemon" src="/lemon.svg" alt="lemon"></img>
                    <h2>MyMeals Page</h2>
                    <button onClick={() => navigate('/')}>back to search</button>
                </div>

                <hr className="divider" />
                {recipeInfo.myRecipeList.length === 0 && <p>No meals saved yet!</p>}
                <RecipeDisplay recipeList={recipeInfo.myRecipeList}/>
            </div>
        </div>

    )
}