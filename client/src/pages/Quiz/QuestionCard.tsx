import { SetStateAction } from "react"
import { Question, Answer } from "./quizTypes"

type QuestionCardProp = {
  question: Question
  onSet: React.Dispatch<SetStateAction<number[]>>
}

export const QuestionCard = ({question, onSet}: QuestionCardProp) => {
  const handleAnswer = (impact: number[]) => {
    onSet((prev) => prev.map((val, i) => val + impact[i]));
  };

  return <div className="questionContainer">
    <h4>{question.title}</h4>
    <div className="answers">
    {question.answers.map((answer: Answer) => (
      <li className="answer" key={answer.title}>
        <button onClick={() => handleAnswer(answer.impact)
          }>{answer.title}</button>
      </li>
    ))}
  </div>
  </div>
}