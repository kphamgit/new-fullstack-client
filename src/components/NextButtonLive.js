import React, { useContext, useState } from 'react'
import { useSelector } from "react-redux";
import { SocketContext } from './App.js';
import { Button } from 'flowbite-react';
import {getNextQuestion} from './services/list.js'


function NextButtonLive({ quiz_id, next_question_number, setNextQuestion, setShowQuestion, resetNextButtonFlag }) {
    
    const socket = useContext(SocketContext);
    const user = useSelector(state => state.user.value)
    const [endofquiz, setEndofquiz] = useState(false)
    
    const get_next_question = () => {
    getNextQuestion(quiz_id, next_question_number)
      .then((response) => {
        if (response.data.end_of_quiz) {
                setEndofquiz(true)  
        }
        else {
          setShowQuestion(true)
          setNextQuestion(response.data.question)
          resetNextButtonFlag(false)
          const params = {
            user_name: user.user_name,
            livequestionnumber: response.data.question.question_number
          }
          socket.emit("next_question_fetched", params)
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

export default NextButtonLive