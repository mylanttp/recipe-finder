import { SetStateAction, useState } from "react"
import { Question, Answer } from "./quizTypes"

type QuestionCardProp = {
  question: Question
  onSet: React.Dispatch<SetStateAction<number[]>>
}

export const QuestionCard = ({question, onSet}: QuestionCardProp) => {
  const [picked, setPicked] = useState({title: "none picked", image: "none", impact: [0,0,0,0]} as Answer)
  const handleAnswer = (answer: Answer) => {
    if(picked.title !== answer.title){
      onSet((prev) => prev.map((val, i) => val - picked.impact[i] + answer.impact[i]));
      setPicked(answer);
    }
  };

  return <div className="questionContainer">
    <h4>{question.title}</h4>
    <div className="answers">
    {question.answers.map((answer: Answer) => (
      <li className="answer" key={answer.title}>
        <button onClick={() => handleAnswer(answer)
          }>{answer.title}</button>
      </li>
    ))}
  </div>
  </div>
}