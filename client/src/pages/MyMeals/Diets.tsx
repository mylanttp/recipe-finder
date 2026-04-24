import { useContext } from "react";
import { RecipeContext } from "../../RecipeContext";
import { removeDiet, updateDiets } from "../../components/HandlePreferences";

type DietsProps = {
    databaseSave: boolean
}

export const Diets = ({databaseSave}: DietsProps) => {
    const context = useContext(RecipeContext);
    if(databaseSave){
        context.setDisplayDiets(context.diets);
    }

    const handleAdd = async (diet: string) => {
        if(!context.displayDiets.includes(diet)){
            if(databaseSave){
                updateDiets(diet)
                context.setDiets([...context.diets, diet]);
            }
            context.setDisplayDiets([...context.displayDiets, diet])
        }
    }

    const handleRemove = async (diet: string) => {
        if(context.displayDiets.includes(diet)){
            if(databaseSave){ // on myMeals page
                removeDiet(diet)
                context.setDiets(context.diets.filter(i => i != diet));
            }
            context.setDisplayDiets(context.displayDiets.filter(i => i != diet));
        }
    }

    return <div>
            <label >{databaseSave? "Add to your diets: " : "Filter diets"}</label>
            <select id="diets" onChange={(event) => handleAdd(event.target.value)}>
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
                    <button onClick={()=>handleRemove(diet)}>{diet}</button>
                </div>
            ))}
        </div>
}