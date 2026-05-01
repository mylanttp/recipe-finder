import { useNavigate } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { Question } from "./quizTypes";
import { quiz1Questions } from "../../constants/quiz1Questions";
import { useState } from "react";
import { Result } from "./Result";

export default function Quiz() {
    const navigate = useNavigate();
    const [results, setResults] = useState([0,0,0,0,0,0,0,0,0,0]);
    const [finishedQuiz, setFinishedQuiz] = useState(false);

    const processResults = () => {
        setFinishedQuiz(true)
    }

    const resetQuiz = () => {
        setResults([0,0,0,0,0,0,0,0,0,0])
        setFinishedQuiz(false)
    }

    return <div>
        <h2>Which Recipe Are You?</h2>
        <button onClick={() => navigate('/')}>back to search</button>
        <p>{results}</p>
        <div className="quizDisplay">
            {quiz1Questions.map((question: Question, index: number) => (
            <div key={question.title}>
            <QuestionCard question={question} onSet={setResults} finished={setFinishedQuiz} index={index}/>
            </div>
            ))}
            <button className="revealButton" onClick={processResults}>Reveal what recipe I am!</button>
            {finishedQuiz? <Result results={results}/> : <p>Please answer all questions</p>}
            <button className="resetButton"onClick={resetQuiz}>Reset quiz!</button>
        </div>
    </div>
}