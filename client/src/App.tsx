import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search/Search";
import "./styles/App.css";
import Quiz from "./pages/Quiz/Quiz";
import MyMeals from "./pages/MyMeals/MyMeals";
import { Recipe } from "./types";
import React, { useState } from "react";
import { RecipeContext } from "./RecipeContext";

function App() {
    const [myRecipeList, setMyRecipeList] = useState([] as Recipe[])
    
    const addRecipe = (recipe: Recipe): Promise<boolean> => {
        return fetch("http://localhost:8080/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({recipe})
        })
        .then(() => {
            if(!myRecipeList.some(r => r.id === recipe.id)){
                recipe.saved = true;
                setMyRecipeList([...myRecipeList, recipe])
            }
            return true;
        })
        .catch( () => {
            return false;
        })
    };

        const removeRecipe = (recipe: Recipe): Promise<boolean> => {
        return fetch("http://localhost:8080/remove", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({recipe})
        })
        .then(() => {
            recipe.saved = false;
            setMyRecipeList(myRecipeList.filter(r => r.id != recipe.id))
            return true;
        })
        .catch( () => {
            return false;
        })
    };
    
    return (
    <RecipeContext.Provider value={{myRecipeList: myRecipeList, onAdd: addRecipe, onRemove: removeRecipe}}>
        <div className="appLayout">
            <h1 className="pageTitle">Recipe Finder!</h1>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/myMeals" element={<MyMeals />} />
            </Routes>
        </div>
    </RecipeContext.Provider>
    );
}

export default App;
