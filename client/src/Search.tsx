import { useState } from "react";
import "./App.css";
import "./styles/recipeCardStyle.css"
import "./styles/searchStyle.css"
import { fetchRecipeList } from "./components/FetchRecipe";
import RecipeDisplay from "./components/RecipeDisplay";
import { Recipe, RecipeList } from "./types";

function Search() {
    const [search, setSearch] = useState("")
    const [recipeList, setRecipeList] = useState({list: [{title: "Placeholder"
                ,ingredients: ["ingredient1", "ingredient2"]} as Recipe]} as RecipeList)

   const enterSearch = () => {
        if (search === "") {
            setSearch("What's for lunch?");
            setRecipeList({list: [{title: "Placeholder"
                ,ingredients: ["ingredient1", "ingredient2"]} as Recipe]} as RecipeList);
        } else {
            fetchRecipeList(search)
            .then((res) => setRecipeList(res as RecipeList))
            .catch((err) => console.error(err))
        }
    };

    return (
        <>
            <h1 className="pageTitle">Recipe Finder!</h1>
            <div className="searchPage">
                <div className="subtext">
                    <button className="searchButton" onClick={enterSearch}>Search:</button>
                    <input 
                        className="input"
                        data-testid="search"
                        type="search"
                        placeholder="What's for lunch?"
                        onChange={ (event) => setSearch(event.currentTarget.value)}
                    />
                    <p>OR</p>
                    <button className="quizButton">Take a quiz to see which recipe you are!</button>
                </div>

                <hr className="divider" />

                <RecipeDisplay recipeList={recipeList}/>

            </div>
        </>
        
    );
}

export default Search;
