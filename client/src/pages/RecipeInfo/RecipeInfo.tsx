import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../../RecipeContext";
import { Recipe } from "../../types";
import { useNavigate } from "react-router-dom";
import { Ingredient, RecipeInfoType } from "./recipeInfoTypes.ts";
import "../../styles/recipeInfoStyle.css"

export const RecipeInfo = () => {
    const context = useContext(RecipeContext);
    const recipe = context.recipeInfo;
    const [recipeInfo, setRecipeInfo] = useState<RecipeInfoType | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        fetchRecipeInfo(recipe).then((data) => setRecipeInfo(data));
    }, []);

    const fetchRecipeInfo = (recipe: Recipe): Promise<RecipeInfoType> => {
        return fetch(`http://localhost:8080/api/info?q=${encodeURIComponent(recipe.id)}`)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.error(err, "Unable to fetch recipe info")
            throw err
        })

    }

if (!recipeInfo) return <p>Loading...</p>;

return <div>
    <button onClick={() => navigate('/')}>back to search</button>
    {recipe.id === 1 ? <p>{recipe.title}</p> :
        <div className="recipeInfoPage">
        <div className="overview">
            <div className="overviewLeft">
                <h2 className="overviewTitle">{recipeInfo.title}</h2>
                <div className="tags">
                    {recipeInfo.glutenFree && <span className="tag tagGreen">Gluten Free</span>}
                    {recipeInfo.dairyFree && <span className="tag tagBlue">Dairy Free</span>}
                    {recipeInfo.vegan && <span className="tag tagPurple">Vegan</span>}
                    {recipeInfo.vegetarian && <span className="tag tagYellow">Vegetarian</span>}
                    {recipeInfo.veryHealthy && <span className="tag tagPink">Very Healthy</span>}
                </div>
                <div className="quickInfo">
                    <p>🍽 Serves {recipeInfo.servings}</p>
                    <div className="times">
                        <div className="timeCircle circleYellow">
                            <p>{recipeInfo.readyInMinutes}</p>
                            <span>total</span>
                        </div>
                        <div className="timeCircle circleGreen">
                            <p>{recipeInfo.preparationMinutes}</p>
                            <span>prep</span>
                        </div>
                        <div className="timeCircle circlePink">
                            <p>{recipeInfo.cookingMinutes}</p>
                            <span>cook</span>
                        </div>
                    </div>
                    <p className="summary">{recipeInfo.summary}</p>
                </div>
            </div>
            <div className="overviewRight">
                <div className="recipeInfoImageBox">
                    <img className="recipeImage" src={recipeInfo.image} alt={recipeInfo.title}/>
                </div>
            </div>
        </div>

            <div className="ingredients">
                <h3>Ingredients</h3>
                {recipeInfo.extendedIngredients?.map((ingredient: Ingredient) => (
                    <p key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </p>
                ))}
            </div>

            <div className="directions">
                <h3>Directions</h3>
                <p>{recipeInfo.instructions}</p>
            </div>

            <div className="nutrition">
                <h3>About</h3>
                <p>Source: <a href={recipeInfo.sourceUrl}>{recipeInfo.sourceName}</a></p>
            </div>
        </div>
    }
    </div>
}

