import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search/Search";
import Quiz from "./pages/Quiz/Quiz";
import MyMeals from "./pages/MyMeals/MyMeals";
import { Recipe } from "./types";
import { useEffect, useState } from "react";
import { RecipeContext } from "./RecipeContext";
import AuthUserProvider from "./auth/AuthUserProvider";
import Header from "./components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDiets, getIntolerances } from "./components/HandlePreferences";
import { RecipeInfo } from "./pages/RecipeInfo/RecipeInfo";
import "./index.css"

function App () {
    const [myRecipeList, setMyRecipeList] = useState<Recipe []>([])
    const [diets, setDiets] = useState<string[]>([]); 
    const [intolerances, setIntolerances] = useState<string[]>([]); 
    const [displayIntolerances, setDisplayIntolerances] = useState(intolerances);
    const [displayDiets, setDisplayDiets] = useState(diets);
    const [recipeInfo, setRecipeInfo] = useState<Recipe>({ 
                                                            id:1,
                                                            title:"No Recipe Selected Yet",
                                                            image:"No image",
                                                            imageType:"No image",
                                                            saved: false} as Recipe);

    // process log in / sign out
    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) { //if a user is logged in, set their saved meals, diets, & intolerances from the DB
                const token = await user.getIdToken();
                const res = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                setMyRecipeList(data);
                setDiets(await getDiets());
                setIntolerances(await getIntolerances());
                setDisplayDiets(await getDiets());
                setDisplayIntolerances(await getIntolerances());
                
            } else {
                setMyRecipeList([]);
                setDiets([]);
                setIntolerances([]);
                setDisplayDiets([]);
                setDisplayIntolerances([]);
            }
        });

        return () => unsubscribe(); // cleanup on unmount
    }, []); // run once
    
    // add recipe to user's database
    const addRecipe = async (recipe: Recipe): Promise<boolean> => {
        const auth = getAuth()
        const currentUser = auth.currentUser;
        const token = currentUser ? await currentUser.getIdToken() : null;

        return fetch(`${import.meta.env.VITE_API_URL}/add`, {
            method: "POST",
            headers: {
                ...(token && {"Authorization": `Bearer ${token}`}),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({recipe})
        })
        .then(() => {
            if(!myRecipeList.some(r => r.id === recipe.id)){
                recipe.saved = true;
                setMyRecipeList([...myRecipeList, recipe]) // spreads
            }
            return true;
        })
        .catch( () => {
            return false;
        })
    };

    // remove recipe from users data
    const removeRecipe = async (recipe: Recipe): Promise<boolean> => {
        const auth = getAuth()
        const currentUser = auth.currentUser;
        const token = currentUser ? await currentUser.getIdToken() : null;
        
        return fetch(`${import.meta.env.VITE_API_URL}/remove`, {
            method: "DELETE",
            headers: {
                ...(token && { "Authorization": `Bearer ${token}` }),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({recipe})
        })
        .then(() => {
            recipe.saved = false;
            setMyRecipeList(myRecipeList.filter(r => r.id != recipe.id)) //removes the recipe with the matching id
            return true;
        })
        .catch( () => {
            return false;
        })
    };

    return (
        <AuthUserProvider>
            <RecipeContext.Provider value={{myRecipeList: myRecipeList, onAdd: addRecipe, onRemove: removeRecipe,
                                            diets: diets, intolerances: intolerances, setDiets: setDiets, setIntolerances: setIntolerances,
                                            displayDiets: displayDiets, displayIntolerances: displayIntolerances,
                                            setDisplayDiets: setDisplayDiets, setDisplayIntolerances: setDisplayIntolerances,
                                            recipeInfo: recipeInfo, setRecipeInfo: setRecipeInfo}}>
                <div>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/myMeals" element={<MyMeals />} />
                        <Route path="/recipe/" element={<RecipeInfo />}/>
                    </Routes>
                </div>
            </RecipeContext.Provider>
        </AuthUserProvider>
    );
}

export default App;
