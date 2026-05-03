import { useContext, useState } from "react";
import "../../styles/searchStyle.css"
import { fetchRecipeList } from "../../components/FetchRecipe";
import RecipeDisplay from "../../components/RecipeDisplay";
import { Recipe } from "../../types";
import { useNavigate } from "react-router-dom";
import { Diets } from "../MyMeals/Diets";
import { Intolerances } from "../MyMeals/Intolerances";
import { RecipeContext } from "../../RecipeContext";
import { testRecipeList } from "../../constants/testRecipeList";

function Search() {
    const context = useContext(RecipeContext);
    const [search, setSearch] = useState("")
    const [recipeList, setRecipeList] = useState(testRecipeList)
    const navigate = useNavigate()
    
    const enterSearch = () => {
        if (search === "") {
            setSearch("What's for lunch?");
            setRecipeList([] as Recipe[]);
        } else {
            fetchRecipeList({search: search, diet: context.displayDiets, intolerances: context.displayIntolerances})
            .then((res) => setRecipeList(res as Recipe[]))
            .catch((err) => console.error(err))
        }
    }

    return (
        <div className="searchPage">
            <div className="filtersContainer">
                <img className="leaves" src="/leaves.svg" alt="leaves" />
                <p className="filterTitle">Filter your search</p>
                <div className="intoleranceSection">
                    <Intolerances databaseSave={false}/>
                </div>
                <div className="dietSection">
                    <Diets databaseSave={false}/>
                </div>
            </div>

            <div className="rightSearch">
                <div className="subtext">
                    <button className="searchButton" onClick={enterSearch}>Search:</button>
                    <input 
                        className="input"
                        data-testid="search"
                        type="search"
                        placeholder="What's for lunch?"
                        onChange={ (event) => setSearch(event.currentTarget.value)}
                        onKeyDown={(event) => { if (event.key === 'Enter') enterSearch() }}
                    />
                    <p> Can't decide?</p>
                    <button className="quizButton" onClick={() => navigate('/quiz')}>Take a quiz to see which recipe you are!!</button>
                </div>

                <hr className="divider" />
                {recipeList[0].id === 637440 && <p className="browseText">Browse top recipes!</p>}
                <RecipeDisplay recipeList={recipeList}/>
            </div>
        </div>
    );
}

export default Search;
