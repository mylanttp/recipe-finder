import RecipeDisplay from "../../components/RecipeDisplay";

type ResultProp = {
  results: number[]
}

export const Result = ({results}: ResultProp) => {  
  return <div>
      <p>Your answer goes here! and it will be based on this {results}</p>
      <RecipeDisplay recipeList={[{
          id: 1, title: "Result recipe", image: "blank", imageType: "blank", saved: false
        }]} />
    </div>
}