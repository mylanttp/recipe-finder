import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../../RecipeContext";
import { Recipe } from "../../types";
import { useNavigate } from "react-router-dom";
import { RecipeInfoType } from "./recipeInfoTypes.ts";


export const RecipeInfo = () => {
    const context = useContext(RecipeContext);
    const recipe = context.recipeInfo;
    const [recipeInfo, setRecipeInfo] = useState<RecipeInfoType>();
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
    
    return <div>
        <button onClick={() => navigate('/')}>back to search</button>
        {recipe.id === 1? <p>{recipe.title}</p>:
            <div>
                <p>Recipe Info for {recipe.title}</p>
                <p>{recipeInfo?.readyInMinutes}</p>            
            </div>
        }
    </div>
}