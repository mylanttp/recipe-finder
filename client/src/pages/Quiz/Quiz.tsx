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
        <li key={question.title}>
          <QuestionCard question={question} onSet={setResults}/>
        </li>
        ))}
        {}
        <Result results={results}/>
    </div>
}

// Page for the quiz

// Array of ints representing different qualities
// Each question has a title and 4 answer choices
// Each answer has an array of ints corresponding to how they change the user's final array
// User has a response array of ints that changes with each answer choice