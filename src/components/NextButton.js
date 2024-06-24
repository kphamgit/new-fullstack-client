import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
//import { setQuestion } from "../../redux/question.js";
//import { setQuestionAttemptId } from "../../redux/question_att_id.js";
import styled from 'styled-components'
//import { setShowQuestionAttempt } from '../../redux/showquestionattempt.js';

const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`

function NextButton({ next_question_number, setNextQuestion, setShowQuestion,setQuestionAttemptId  }) {
    const rootpath = useSelector((state) => state.rootpath.value)
    const quiz_attempt_id = useSelector((state) => state.quiz_attempt_id.value)
    const nextButtonFlag = useSelector(state => state.nextbuttonflag.value)
    const livequizflag = useSelector(state => state.livequizflag.value)
    const dispatch = useDispatch()
    const [endofquiz, setEndofquiz] = useState(false)
    const get_next_question = () => {
        //console.log("next quiz attempt id"+quiz_attempt_id)
        //console.log("next question number"+next_question_number)
        var url = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/creat_next_question_attempt/' + next_question_number
        axios.get(url).then((response) => {
            //console.log("Next question response=", response)
            if (response.data.end_of_quiz) {
                //console.log("END OF QUIX NextButton")
                    setEndofquiz(true)
            }
            else {
                //console.log("in NextButton get_next_question")
                //dispatch(setQuestion(response.data.question))
                setNextQuestion(response.data.question)
                setShowQuestion(true)
               // dispatch(setQuestionAttemptId(response.data.question_attempt_id))
                setQuestionAttemptId(response.data.question_attempt_id)
                //dispatch(setShowQuestionAttempt(true))
                //setShowQuestionAttemptFlag(true)
            }
        });
    
    }

    if (endofquiz) {
        return <h3>END OF QUIZ</h3>
    }

    if (livequizflag) {
        return (
           <>
             { nextButtonFlag &&
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