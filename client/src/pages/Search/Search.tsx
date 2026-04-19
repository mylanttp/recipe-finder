import { useState } from "react";
import "../../styles/searchStyle.css"
import { fetchRecipeList } from "../../components/FetchRecipe";
import RecipeDisplay from "../../components/RecipeDisplay";
import { Recipe } from "../../types";
import { useNavigate } from "react-router-dom";

type searchProps = {
    addRecipe: (recipe: Recipe) => Promise<boolean>
    removeRecipe: (recipe: Recipe) => Promise<boolean>
}

function Search({addRecipe, removeRecipe}: searchProps) {
    const placeholderList: Recipe[] = [{id: 1, title: "Placeholder", image: "nothing yet", imageType: "jpg"} as Recipe]

    const [search, setSearch] = useState("")
    const [recipeList, setRecipeList] = useState(placeholderList as Recipe[])
    const navigate = useNavigate()
    
    const enterSearch = () => {
        if (search === "") {
            setSearch("What's for lunch?");
            setRecipeList(placeholderList as Recipe[]);
        } else {
            fetchRecipeList(search)
            .then((res) => setRecipeList(res as Recipe[]))
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
            <button className="mealButton" onClick={() => navigate('/myMeals')}>MyMeals</button>
            <hr className="divider" />
            <RecipeDisplay recipeList={recipeList} onAdd={addRecipe} onRemove={removeRecipe}/>
        </>
        
    );
}

export default Search;
