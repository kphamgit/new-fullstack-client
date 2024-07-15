import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
//import { setQuestion } from "../../redux/question.js";
import { SocketContext } from './App.js';
import { Button } from 'flowbite-react';


function NextButton({ next_question_number, setNextQuestion, setShowQuestion,setQuestionAttemptId  }) {
    
    const rootpath = useSelector((state) => state.rootpath.value)
    const socket = useContext(SocketContext);
    const quiz_attempt_id = useSelector((state) => state.quiz_attempt_id.value)
    const livequizflag = useSelector(state => state.livequizflag.value)
    const nextButtonFlag = useSelector(state => state.nextbuttonflag.value)
    const user = useSelector(state => state.user.value)
    const [endofquiz, setEndofquiz] = useState(false)
    const get_next_question = () => {
        var url = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/creat_next_question_attempt/' + next_question_number
        axios.get(url).then((response) => {
            //console.log("Next question response=", response)
            if (response.data.end_of_quiz) {
                //console.log("END OF QUIX NextButton")
                    setEndofquiz(true)
            }
            else {
                //console.log("in NextButton get_next_question data =", response.data)
                setNextQuestion(response.data.question)
                setShowQuestion(true)
                setQuestionAttemptId(response.data.question_attempt_id)
                if (livequizflag) {
                    const params = {
                        user_name: user.user_name,
                        livequestionnumber: response.data.question.question_number
                    }
                    socket.emit("next_question_fetched", params)
                }
            }
        });
    
    }

    if (endofquiz) {
        return <h3>END OF QUIZ</h3>
    }

    if (livequizflag) {
        return (
           <>  { nextButtonFlag && 
                <Button onClick={() => get_next_question()}>Next</Button>
           }
           </>
        )
    }
    return ( 
             <Button onClick={() => get_next_question()}>Next</Button>
    )
}

export default NextButton