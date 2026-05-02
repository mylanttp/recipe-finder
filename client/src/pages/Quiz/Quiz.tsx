import { useNavigate } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { Question } from "./quizTypes";
import { quiz1Questions } from "../../constants/quiz1Questions";
import { useEffect, useRef, useState } from "react";
import { Result } from "./Result";

export default function Quiz() {
    const navigate = useNavigate();
    const [results, setResults] = useState([0,0,0,0,0,0,0,0,0,0]);
    const [finishedQuiz, setFinishedQuiz] = useState(false);
    const [resetKey, setResetKey] = useState(false);
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => { // when the quiz is finished scroll down to the bottom
    if (finishedQuiz) { 
        const element = document.getElementById("quizBottom");
        if (element) { 
            const top = element.getBoundingClientRect().top + window.scrollY - 750;
            window.scrollTo({ behavior: 'smooth', top });
        }
    }
}, [finishedQuiz]); //runs when the state of finishedQuiz changes

    const resetQuiz = () => {
        setResults([0,0,0,0,0,0,0,0,0,0])
        setFinishedQuiz(false)
        setResetKey(!resetKey);
        const element = document.getElementById("quizTop");
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ behavior: 'smooth', top });
        }
    }

    const scrollToNext = (index: number) => {
        console.log(index);
        if (index + 1 < quiz1Questions.length) {
            console.log("a");
            const element = questionRefs.current[index + 1]; //get the next question's reference location
            if (element) {
                const top = element.getBoundingClientRect().top + window.scrollY - 120; // adjust so a bit higher
                window.scrollTo({ top, behavior: 'smooth' }); //scroll
            }
        } else {
            console.log("b");
            setFinishedQuiz(true)
        }
    }

    return <div>
        <h2 id="quizTop">Which Recipe Are You?</h2>
        <button onClick={() => navigate('/')}>back to search</button>
        <div className="quizDisplay">
            {quiz1Questions.map((question: Question, index: number) => (
            <div key={question.title} ref={(el) => questionRefs.current[index] = el}>
                <QuestionCard question={question} onSet={setResults} resetKey={resetKey} setFinishedQuiz={setFinishedQuiz} index={index} scrollToNext={scrollToNext}/>
            </div>
            ))}
            {finishedQuiz? <Result results={results}/> : <p>Please answer all questions</p>}
            <button id="quizBottom" className="resetButton"onClick={resetQuiz}>Reset quiz!</button>
        </div>
    </div>
}