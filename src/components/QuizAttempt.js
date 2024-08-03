import React, {useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionAttempt from './QuestionAttempt.js'
import { Link } from 'react-router-dom';
import {setQuizAttemptId} from "../redux/quiz_att_id.js"
import QuestionResponse from "./QuestionResponse.js";
import NextButton from "./NextButton.js";
import useExitPrompt from './useExitPrompt.js'
import { useLocation } from "react-router-dom";
import {findCreateQuizAttempt} from './services/list.js'
import ChatPageTailwind from "./chat/ChatPageTailwind.js";
import { useIsMounted } from "./useIsMounted";

export default function QuizAttempt() {
  const user = useSelector((state) => state.user.value) 
  //const livequizflag = useSelector((state) => state.livequizflag.value) 

  const dispatch = useDispatch()  
    const [currentquestionnumber, setCurrentQuestionNumber] = useState(null)
    const [question, setQuestion] = useState(null) 
    const [showQuestion, setShowQuestion] = useState(false)
    const [showAttemptResponse, setShowQuestionAttemptResponse] = useState(false)
    const [questionAttemptId, setQuestionAttemptId] = useState(null)
    const [attemptResponse, setAttemptResponse] = useState(null)
    const isMounted = useIsMounted()
    const mounted = useRef(false);
    //const [livequizready, setLiveQuizReady] = useState(false)
    //mounted.current = true;
    //if(mounted.current) {
   /*
   const handleClick = (e) => {
    e.preventDefault();
    setShowExitPrompt(!showExitPrompt)
  }
  //use a Button to toggle showExitPrompt. For now, showExitPrompt is always set to true
  https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd
  */
  
  const currentLocation = useLocation()
  const arr = currentLocation.pathname.split('/')
  const quizId = arr[arr.length-1]
  

    const setTheNextQuestion = (value) => {
        setQuestion(value)
        setCurrentQuestionNumber(value.question_number)
        setShowQuestionAttemptResponse(false)
        
    }
    const setTheAttemptResponse = (value) => {
      //this function is called in QuestionAttempt after it finishes
      //processing the question attempt and a response is returned
      setAttemptResponse(value)
      setShowQuestionAttemptResponse(true)
   }

   useEffect(() => {
      findCreateQuizAttempt(quizId, user.id)
      .then((response) => {
        if(isMounted) {
          console.log(" response =", response.data)
          console.log("QuizAttempt component mounted")
          setTheNextQuestion(response.data.question)
          setShowQuestion(true)
          setQuestionAttemptId(response.data.question_attempt_id)
          dispatch(setQuizAttemptId(response.data.quiz_attempt_id))
        }
        else {
          console.log("component is not mounted yet")
        }
      })
      .catch(error => {
          console.log(error)
      });
   },[dispatch, quizId, isMounted, user.id])

  const setShowQuestionFlag = (value) => {
       setShowQuestion(value)
    }

    const setTheQuestionAttemptId = (value) => {
      //this function is called in NextButton upon a question_attempt_id is created
      //from the server
       setQuestionAttemptId(value)
    }

    return ( 
      <>
      <div className="m-10 ">
        <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
          <Link to='/' >Home</Link>
        </div>
         <br />
        <div className="grid grid-cols-8 gap-2 bg-slate-500">
            <div className="bg-gray-100 col-span-6 p-3">
            {(showQuestion) ?
              <QuestionAttempt 
                question={question} 
                setShowQuestion={setShowQuestionFlag}
                setAttemptResponse={setTheAttemptResponse}
                questionAttemptId={questionAttemptId}
              />
              :
              <div>
                 {showAttemptResponse && <QuestionResponse question={question} response_content={attemptResponse} />}
                 <div> <NextButton 
              next_question_number={currentquestionnumber +1} 
              setNextQuestion={setTheNextQuestion}
              setShowQuestion={setShowQuestionFlag}
              setQuestionAttemptId={setTheQuestionAttemptId}
            /></div>
              </div>
            }
            </div>
            <div className="bg-red-300 col-span-2">
               Live Score Board
            </div>
        </div>
        
      </div>
       </>
    )
    
}

