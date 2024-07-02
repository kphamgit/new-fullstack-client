import React from 'react'
import axios from 'axios'
import {  useSelector } from 'react-redux'
//import {setAttemptResponse} from '../../redux/attemptResponse'
import styled from 'styled-components'
//import { setEndOfQuiz } from '../../redux/endofquiz'
//import { setShowQuestionAttempt } from '../../redux/showquestionattempt'

const Button = styled.button`
background-color:brown;
color:white;
padding:5px 15px;
`
  function SubmitButtonRecordQA({sendblob}) {
 
  const rootpath = useSelector((state) => state.rootpath.value)
  const question_attempt_id = useSelector((state) => state.question_attempt_id.value)
  const quiz_attempt_id = useSelector((state) => state.quiz_attempt_id.value)
  //const [showquestionattempt, setShowQuestionAttempt] = useState(null)
  //
  //const question_attempt_reponse = useSelector((state) => state.question_attempt_reponse.value)
    //const dispatch = useDispatch()
    let user_answer =  useSelector((state) => state.answer.value)
    
    const process_question_attempt = async () => {

            user_answer= []
  
        //console.log("in process question atempt questionattempt = ", questionattempt)
        //console.log("in process question atempt user answer = ", user_answer)
        var url1 = rootpath + '/api/question_attempts/' + question_attempt_id + '/process_attempt'
        const firstRequest = await axios.post(url1,{user_answer: user_answer})
        //console.log(" data1",data1)
        //dispatch(setAttemptResponse(firstRequest.data))
        //toggleShowQuestionAttempt(false)
        //dispatch(setShowQuestionAttempt(false))
        //console.log("data1 question number"+data1.question_number)
        const next_question_number = firstRequest.data.question_number + 1
        var url2 = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/get_next_question/' + next_question_number
        const secondRequest = await axios.get(url2)
        //console.log("data from second request CCCCCCCC",secondRequest.data)
        if (secondRequest.data.end_of_quiz) {
          //console.log(" END OF QUIX")
            //dispatch(setEndOfQuiz(true))
        }
        sendblob()
    }

  return (
    <>
    <div>&nbsp;</div>
    <Button  onClick={() => process_question_attempt()}>Submit</Button>
    </>
  )
}

export default SubmitButtonRecordQA