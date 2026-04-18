import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search/Search";
import "./styles/App.css";
import Quiz from "./pages/Quiz/Quiz";
import MyMeals from "./pages/MyMeals/MyMeals";
import { Recipe } from "./types";
import { useState } from "react";



function App() {
    const placeholderList: Recipe[] = [{id: 1, title: "Placeholder", image: "nothing yet", imageType: "jpg"} as Recipe]
    const [myRecipeList, setMyRecipeList] = useState(placeholderList as Recipe[])

    const addRecipe = (recipe: Recipe): Promise<boolean> => {
        console.log(recipe)
        return fetch("http://localhost:8080/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({recipe})
        })
        .then(() => {
            setMyRecipeList([...myRecipeList, recipe])
            return true;
        })
        .catch( () => {
            return false;
        })
    };
    

  return (
    <div className="appLayout">
    <h1 className="pageTitle">Recipe Finder!</h1>

    <Routes>
        <Route path="/" element={<Search addRecipe={addRecipe}/>} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/myMeals" element={<MyMeals myRecipeList={myRecipeList} addRecipe={addRecipe}/>} />
    </Routes>
    </div>
  );
}

export default App;
