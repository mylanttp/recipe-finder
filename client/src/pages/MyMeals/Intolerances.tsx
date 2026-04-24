import { useContext } from "react"
import { removeIntolerance, updateIntolerances } from "../../components/HandlePreferences";
import { RecipeContext } from "../../RecipeContext";

type IntolerancesProps = {
    databaseSave: boolean
}

export const Intolerances = ({databaseSave}: IntolerancesProps) => {
    const context = useContext(RecipeContext);
    if(databaseSave){
        context.setDisplayIntolerances(context.intolerances);
    }

    const handleAdd = async (intolerance: string) => {
        if(!context.displayIntolerances.includes(intolerance)){
            if(databaseSave){ // on myMeals page
                updateIntolerances(intolerance) // update intolerances on DB
                context.setIntolerances([...context.intolerances, intolerance]); // updates users intolerances locally
            }
            context.setDisplayIntolerances([...context.displayIntolerances, intolerance])
        }
    }

    const handleRemove = async (intolerance: string) => {
        if(context.displayIntolerances.includes(intolerance)){
            if(databaseSave){ // on myMeals page
                removeIntolerance(intolerance)
                context.setIntolerances(context.intolerances.filter(i => i != intolerance)); // updates users intolerances locally
            }
            context.setDisplayIntolerances(context.displayIntolerances.filter(i => i != intolerance));
        }
    }
    
    return <div>
            <label >{databaseSave? "Add to your intolerances: " : "Filter intolerances"}</label>
            <select id="intolerances" onChange={(event) => handleAdd(event.target.value)}>
                <option value="Dairy">Dairy</option>
                <option value="Egg">Egg</option>
                <option value="Gluten">Gluten</option>
                <option value="Grain">Grain</option>
                <option value="Peanut">Peanut</option>
                <option value="Seafood">Seafood</option>
                <option value="Sesame">Sesame</option>
                <option value="Shellfish">Shellfish</option>
                <option value="Soy">Soy</option>
                <option value="Sulfite">Sulfite</option>
                <option value="Tree Nut">Tree Nut</option>
                <option value="Wheat">Wheat</option>
            </select>
            {context.displayIntolerances.map((intolerance: string) => (
                <div key={intolerance}>
                    <button onClick={()=>handleRemove(intolerance)}>{intolerance}</button>
                </div>
            ))}
        </div>
}