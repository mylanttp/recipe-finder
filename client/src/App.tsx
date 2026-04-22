import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search/Search";
import "./styles/App.css";
import Quiz from "./pages/Quiz/Quiz";
import MyMeals from "./pages/MyMeals/MyMeals";
import { Recipe } from "./types";
import { useEffect, useState } from "react";
import { RecipeContext } from "./RecipeContext";
import AuthUserProvider from "./auth/AuthUserProvider";
import Header from "./components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App () {
    const [myRecipeList, setMyRecipeList] = useState([] as Recipe[])

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const res = await fetch("http://localhost:8080/recipes", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                setMyRecipeList(data);
            } else {
                setMyRecipeList([]);
            }
        });

        return () => unsubscribe(); // cleanup on unmount
    }, []);

    
    const addRecipe = async (recipe: Recipe): Promise<boolean> => {
        const auth = getAuth()
        const currentUser = auth.currentUser;
        const token = currentUser ? await currentUser.getIdToken() : null;

        return fetch("http://localhost:8080/add", {
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
                setMyRecipeList([...myRecipeList, recipe])
            }
            return true;
        })
        .catch( () => {
            return false;
        })
    };

    const removeRecipe = async (recipe: Recipe): Promise<boolean> => {
        const auth = getAuth()
        const currentUser = auth.currentUser;
        const token = currentUser ? await currentUser.getIdToken() : null;
        
        return fetch("http://localhost:8080/remove", {
            method: "DELETE",
            headers: {
                ...(token && { "Authorization": `Bearer ${token}` }),
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
        <AuthUserProvider>
            <RecipeContext.Provider value={{myRecipeList: myRecipeList, onAdd: addRecipe, onRemove: removeRecipe}}>
                <Header/>
                <div>
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/myMeals" element={<MyMeals />} />
                    </Routes>
                </div>
            </RecipeContext.Provider>
        </AuthUserProvider>
    );
}

export default App;
