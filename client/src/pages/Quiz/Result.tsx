import RecipeDisplay from "../../components/RecipeDisplay";
import "../../styles/recipeCardStyle.css"
import { quiz1Answers } from "../../constants/quiz1Answers";

type ResultProp = {
  results: number[]
}

export const Result = ({results}: ResultProp) => {  
  const answers = quiz1Answers;

  const handleResults = () => {
    const i = results.indexOf(Math.max(...results))
    return answers[i].recipe;
  }

  return <div className="resultBox">
      <p>{answers[results.indexOf(Math.max(...results))].title}</p>
      <p>{answers[results.indexOf(Math.max(...results))].blurb}</p>
      <RecipeDisplay recipeList={[handleResults()]} />
    </div>
}