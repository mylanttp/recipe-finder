import { useNavigate } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { Question } from "./quizTypes";
import { quiz1Questions } from "../../constants/quiz1Questions";
import { useState } from "react";
import { Result } from "./Result";

export default function Quiz() {
    const navigate = useNavigate();
    const [results, setResults] = useState([0,0,0,0]);
    const [finishedQuiz, setFinishedQuiz] = useState(false);
    //const [recipeResult, setRecipeResult] = useState()

    const processResults = () => {
        let sum = 0;
        results.forEach(num => sum += num);
        if(sum === 9){
            setFinishedQuiz(true)
            
        }
    }

    return <div>
        <h2>Quiz Page</h2>
        <h3>------------WORK IN PROGRESS---------------</h3>
        <button onClick={() => navigate('/')}>back to search</button>
        <p>{results}</p>
        {quiz1Questions.map((question: Question) => (
            <div key={question.title}>
            <QuestionCard question={question} onSet={setResults}/>
            </div>
        ))}
        <button onClick={processResults}>Reveal what recipe I am!</button>
        {finishedQuiz? <Result results={results}/> : <p>Please answer all questions</p>}
    </div>
}