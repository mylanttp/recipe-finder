import { useContext, useEffect } from "react"
import { updateIntolerances } from "../../components/HandlePreferences";
import { RecipeContext } from "../../RecipeContext";

type IntolerancesProps = {
    databaseSave: boolean
}

export const Intolerances = ({databaseSave}: IntolerancesProps) => {
    const context = useContext(RecipeContext);

    useEffect(() => {
        if(databaseSave){
            context.setDisplayIntolerances(context.intolerances);
        }
    }, []);

    const handleUpdate = async (intolerance: string, action: string) => {
        if(intolerance === "default"){ return; }
        if(action === "add" && !context.displayIntolerances.includes(intolerance)){
            if(databaseSave){
                updateIntolerances(intolerance, action)
                context.setIntolerances([...context.intolerances, intolerance]);
            }
            context.setDisplayIntolerances([...context.displayIntolerances, intolerance])
        } else if(action === "remove"){
            if(databaseSave){
                updateIntolerances(intolerance, action)
                context.setIntolerances(context.intolerances.filter(i => i !== intolerance));
            }
            context.setDisplayIntolerances(context.displayIntolerances.filter(i => i !== intolerance))
        }
    }

    return <div>
            <label >{databaseSave? "Add to your intolerances: " : "Filter intolerances"}</label>
            <select id="intolerances" onChange={(event) => handleUpdate(event.target.value, "add")}>
                <option value="default">Select an option</option>
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
                    <button onClick={()=>handleUpdate(intolerance, "remove")}>{intolerance}</button>
                </div>
            ))}
        </div>
}