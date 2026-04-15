import { useState } from "react";
import "../styles/searchStyle.css"
import { fetchRecipeList } from "./FetchRecipe";
import RecipeDisplay from "./RecipeDisplay";
import { Recipe, RecipeList } from "../types";
import { useNavigate } from "react-router-dom";

function Search() {
    const [search, setSearch] = useState("")
    const [recipeList, setRecipeList] = useState({
        list: [{
            id: 1,
            title: "Placeholder",
            image: "nothing yet",
            imageType: "jpg"} as Recipe
        ]} as RecipeList)
    const navigate = useNavigate()

    const placeholderList: Recipe[] = [{id: 1, title: "Placeholder", image: "nothing yet", imageType: "jpg"} as Recipe]


   const enterSearch = () => {
        if (search === "") {
            setSearch("What's for lunch?");
            setRecipeList({list: placeholderList} as RecipeList);
        } else {
            fetchRecipeList(search)
            .then((res) => setRecipeList(res as RecipeList))
            .catch((err) => console.error(err))
        }
    };

    return (
        <>
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
                <button className="quizButton" onClick={() => navigate('/quiz')}>Take a quiz to see which recipe you are!</button>
            </div>
            <hr className="divider" />
            <RecipeDisplay recipeList={recipeList}/>
        </>
        
    );
}

export default Search;
