import { SetStateAction, useState } from "react"
import { Question, Answer } from "./quizTypes"
import "../../styles/quizStyle.css"

type QuestionCardProp = {
  question: Question
  onSet: React.Dispatch<SetStateAction<number[]>>
}

export const QuestionCard = ({question, onSet}: QuestionCardProp) => {
  const [picked, setPicked] = useState({title: "none picked", image: "none", impact: [0,0,0,0]} as Answer)
  
  const handleAnswer = (answer: Answer) => {
    if(picked.title !== answer.title){ //if they already picked the same answer don't change it
      onSet((prev) => prev.map(  //add the impact array to the results array
        (val, i) => val - picked.impact[i] + answer.impact[i])); //changing answers removes the old answer's impact
      setPicked(answer);
    }
  };

  return <div className="questionContainer">
    <h4>{question.title}</h4>
    <div className="answers">
      {question.answers.map((answer: Answer) => (
        <div className="answer" key={answer.title}>
          <button onClick={() => handleAnswer(answer)
            }>{answer.title}</button>
        </div>
      ))}
    </div>
  </div>
}