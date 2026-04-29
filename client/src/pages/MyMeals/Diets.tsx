import { useContext, useEffect } from "react";
import { RecipeContext } from "../../RecipeContext";
import { updateDiets } from "../../components/HandlePreferences";

type DietsProps = {
    databaseSave: boolean
}

export const Diets = ({databaseSave}: DietsProps) => {
    const context = useContext(RecipeContext);

    useEffect(() => {
        if(databaseSave){
            context.setDisplayDiets(context.diets);
        }
    }, []);

    const handleUpdate = async (diet: string, action: string) => {
      if(diet === "default"){ return; }  
      if(action === "add" && !context.displayDiets.includes(diet)){
        if(databaseSave){
            updateDiets(diet, action)
            context.setDiets([...context.diets, diet]);
        }
        context.setDisplayDiets([...context.displayDiets, diet])
    } else if(action === "remove"){
        if(databaseSave){
            updateDiets(diet, action)
            context.setDiets(context.diets.filter(i => i !== diet));
        }
        context.setDisplayDiets(context.displayDiets.filter(i => i !== diet))
    }
    }


    return <div>
            <label >{databaseSave? "Add to your diets: " : "Filter diets"}</label>
            <select id="diets" onChange={(event) => handleUpdate(event.target.value, "add")}>
                <option value="default">Select an option</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole 30">Whole 30</option>
            </select>  
            {context.displayDiets.map((diet: string) => (
                <div key={diet}>
                    <button onClick={()=>handleUpdate(diet, "remove")}>{diet}</button>
                </div>
            ))}
        </div>
}