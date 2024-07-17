import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Button } from 'flowbite-react';
import {createQuestionAttempt} from './services/list.js'

function NextButton({ next_question_number, setNextQuestion, setShowQuestion,setQuestionAttemptId  }) {
    const quiz_attempt_id = useSelector((state) => state.quiz_attempt_id.value)
    const [endofquiz, setEndofquiz] = useState(false)

    const get_next_question = () => {
      createQuestionAttempt(quiz_attempt_id, next_question_number)
      .then((response) => {
        if (response.data.end_of_quiz) {
                setEndofquiz(true)  
        }
        else {
            setNextQuestion(response.data.question)
            setShowQuestion(true)
            setQuestionAttemptId(response.data.question_attempt_id)
        }
      })
      .catch(error => {
          console.log(error)
      });
    }

    if (endofquiz) {
        return <h3>END OF QUIZ</h3>
    }

    return ( 
        <Button onClick={() => get_next_question()}>Next</Button>
    )
}

export default NextButton