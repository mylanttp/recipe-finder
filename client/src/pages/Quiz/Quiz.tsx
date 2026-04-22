import { useNavigate } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { Question } from "./quizTypes";
import { quiz1 } from "../../constants/quiz1";
import { useState } from "react";
import { Result } from "./Result";

export default function Quiz() {
    const navigate = useNavigate();
    const [results, setResults] = useState([0,0,0,0]);
    return <div>
        <h2>Quiz Page</h2>
        <button onClick={() => navigate('/')}>back to search</button>
        <p>{results}</p>
        {quiz1.map((question: Question) => (
        <div key={question.title}>
          <QuestionCard question={question} onSet={setResults}/>
        </div>
        ))}
        {}
        <Result results={results}/>
    </div>
}