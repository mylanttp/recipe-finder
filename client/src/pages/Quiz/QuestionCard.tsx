import { SetStateAction, useEffect, useState } from "react"
import { Question, Answer } from "./quizTypes"
import "../../styles/quizStyle.css"

type QuestionCardProp = {
  question: Question
  onSet: React.Dispatch<SetStateAction<number[]>>
  resetKey: boolean;
  setFinishedQuiz: React.Dispatch<SetStateAction<boolean>>
  index: number
  scrollToNext: (index: number) => void
}

export const QuestionCard = ({question, onSet, resetKey, setFinishedQuiz, index, scrollToNext}: QuestionCardProp) => {
  const [picked, setPicked] = useState({title: "none picked", image: "none", impact: [0,0,0,0,0,0,0,0,0,0,0]} as Answer)
  const colors = ['#5FC39C', '#fb9c9f', '#fbbf0e', '#B994E0', '#66C3FF'];

 useEffect(() => {
    setPicked({title: "none picked", image: "none", impact: [0,0,0,0,0,0,0,0,0,0,0]})
}, [resetKey])

  const handleAnswer = (answer: Answer) => {
    setFinishedQuiz(false)
    if(picked.title !== answer.title){ //if they already picked the same answer don't change it
      onSet((prev) => prev.map(  //add the impact array to the results array
        (val, i) => val - picked.impact[i] + answer.impact[i])); //changing answers removes the old answer's impact
      setPicked(answer);
    }
    scrollToNext(index)
  };

  return <div className="questionContainer">
    <h4 style={{ backgroundColor: colors[index % colors.length] }}
    >{question.title}</h4>
    <div className="answers">
      {question.answers.map((answer: Answer) => (
        <div className="answerCard" key={answer.title}>
          <button className={picked.title === "none picked" ? "" : 
                              picked.title === answer.title ? "answerSelected" : "answerUnselected"}
                              onClick={() => handleAnswer(answer)
            }>
              <img src={answer.image} alt={answer.title}/>
              <p>{answer.title}</p>
              </button>
        </div>
      ))}
    </div>
  </div>
}