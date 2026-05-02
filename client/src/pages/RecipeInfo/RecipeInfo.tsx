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
    {recipe.id === 1 ? <p>{recipe.title}</p> :
        <div className="recipeInfoPage">
            <button onClick={() => navigate('/')}>back to search</button>
            <div className="overview">
                <div className="overviewLeft">
                    <div className="tags">
                        {recipeInfo.glutenFree && <span className="tag tagGreen">Gluten Free</span>}
                        {recipeInfo.dairyFree && <span className="tag tagBlue">Dairy Free</span>}
                        {recipeInfo.vegan && <span className="tag tagPurple">Vegan</span>}
                        {recipeInfo.vegetarian && <span className="tag tagYellow">Vegetarian</span>}
                        {recipeInfo.ketogenic && <span className="tag tagPink">Ketogenic</span>}
                        {recipeInfo.lowFodmap && <span className="tag tagBlue">Low FODMAP</span>}
                        {recipeInfo.whole30 && <span className="tag tagPurple">Whole 30</span>}

                    </div>
                    <h2 className="overviewTitle">{recipeInfo.title}</h2>
                    <div className="overviewNotTitle">
                        <p>{recipeInfo.summary?.replace(/<[^>]*>/g, '').split('.')[0] + '.'}</p>
                        <div className="bars">
                            <div className="servings">
                                Serves {recipeInfo.servings}
                            </div>
                            <div className="price">
                                Price Per Serving: ${((recipeInfo.pricePerServing)/(recipeInfo.servings)/10).toFixed(2)}
                            </div>
                        </div>
                        <button className="addRemoveButton" >{recipe.saved? "Already Saved to recipes" : "Save to your recipes"}</button>
                    </div>
                </div>
                <div className="overviewRight">
                    <div className="recipeInfoImageBox">
                        <img className="recipeImage" src={recipeInfo.image} alt={recipeInfo.title}/>
                        <div className="times">
                            <div className="timeCircle circleYellow">
                                <span >total</span>
                                <p>{recipeInfo.readyInMinutes}</p>
                                <span className="timeUnit">min</span>
                            </div>
                            <div className="timeCircle circleGreen">
                                <span>prep</span>                                
                                <p>{recipeInfo.preparationMinutes}</p>
                                <span className="timeUnit">min</span>
                            </div>
                            <div className="timeCircle circlePink">
                                <span>cook</span>
                                <p>{recipeInfo.cookingMinutes}</p>
                                <span className="timeUnit">min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondInfoBox">
                <div className="ingredients">
                    <h3 className="ingredientsTitle">Ingredients</h3>
                    <div className="ingredientsList"> 
                        <ul>
                            {recipeInfo.extendedIngredients?.map((ingredient: Ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h4 className="aboutTitle">About</h4>
                    <div className="about">
                        <p>Source: <a href={recipeInfo.sourceUrl}>{recipeInfo.sourceName}</a></p>
                    </div>
                </div>

                <div className="directions">
                    <h3 className="directionsTitle">Directions</h3>
                        <div className="directionsList" >
                            <div dangerouslySetInnerHTML={{ __html: recipeInfo.instructions }} />
                        </div>
                </div>
            </div>
        </div>
    }
    </div>
}

