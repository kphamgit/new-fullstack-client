import React, {useState, useContext, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionAttempt from './QuestionAttempt.js'
import { Link } from 'react-router-dom';
import {setQuizAttemptId} from "../redux/quiz_att_id.js"
import QuestionResponse from "./QuestionResponse.js";
import NextButton from "./NextButton.js";
import useExitPrompt from './useExitPrompt.js'
import {findCreateQuizAttempt} from './services/list.js'
import { SocketContext } from "./App.js";
import { setNextButtonFlag } from "../redux/nextbuttonflag.js";
import LiveScoreBoard from "./LiveScoreBoard.js";


export default function QuizAttempt({quizId}) {
  const user = useSelector((state) => state.user.value) 
  const livequizflag = useSelector((state) => state.livequizflag.value) 
  
  const dispatch = useDispatch()  
    const [currentquestionnumber, setCurrentQuestionNumber] = useState(null)
    const [question, setQuestion] = useState(null) 
    const [showQuestion, setShowQuestion] = useState(false)
    const [showAttemptResponse, setShowQuestionAttemptResponse] = useState(false)
    const [questionAttemptId, setQuestionAttemptId] = useState(null)
    const [attemptResponse, setAttemptResponse] = useState(null)
    //const [showExitPrompt, setShowExitPrompt] = useExitPrompt(true);
    
    //const [livequizready, setLiveQuizReady] = useState(false)
    
    const socket = useContext(SocketContext);
   /*
   const handleClick = (e) => {
    e.preventDefault();
    setShowExitPrompt(!showExitPrompt)
  }
  //use a Button to toggle showExitPrompt. For now, showExitPrompt is always set to true
  https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd
  */

  useEffect(() => {
    socket.on('enable_next_button', (arg, callback) => {
      //console.log(" QuizAttempt got enable_next_button_ message arg=", arg)
        //callback({status: "I got enable_next_button message. OK", user_name: user.user_name, last_question_number: currentquestionnumber});
        if (arg.destination.indexOf("except") >= 0) {
          if (arg.target_student !== user.user_name) {
            dispatch(setNextButtonFlag(arg.enable_flag)) 
          }
        }
        else if (arg.destination.indexOf('everybody') >= 0 ) { 
          dispatch(setNextButtonFlag(arg.enable_flag))
        }
        else if (arg.destination.indexOf('only') >= 0 ) {
          if (arg.target_student === user.user_name) {
            dispatch(setNextButtonFlag(arg.enable_flag)) 
          }
        }
        
    })
    return () => {
      socket.off("enable_next_button")
  }   
  },[socket, dispatch, user.user_name, currentquestionnumber])
  
  /*
  //NOTE: this similar to componentWillUnmount()
  /*
  useEffect(() => {
    return () => {
      setShowExitPrompt(false)
    }
    //eslint-disable-next-line
  }, [])
*/
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
    findCreateQuizAttempt(quizId, user.user_name)
    .then((response) => {
      console.log("return from findCreateQuiz...response.data =", response.data)
      setTheNextQuestion(response.data.question)
      setShowQuestion(true)
      setQuestionAttemptId(response.data.question_attempt_id)
      dispatch(setQuizAttemptId(response.data.quiz_attempt_id))
      if (livequizflag) {
        console.log("LIVE QUIX FLAG IS TRUE")
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
    
},[livequizflag, socket, user.user_name, quizId, dispatch]);

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
        <div style={{marginTop:"20px", marginLeft:"80px", marginRight:"50px"}}>
         <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
          <Link to='/' >Home</Link>
         </div>
         <br />
         <div className="flex flex-row gap-2 bg-slate-200 justify-between">
         <div>
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
          <NextButton 
              next_question_number={currentquestionnumber +1} 
              setNextQuestion={setTheNextQuestion}
              setShowQuestion={setShowQuestionFlag}
              setQuestionAttemptId={setTheQuestionAttemptId}
            />
            
          </div>
        }
         </div>
         <div className="bg-green-200">
         { livequizflag &&
            <span>LIVE SCORE BOARD</span>
          }
         </div>
      </div>
      </div>
       </>
    )
    
}

