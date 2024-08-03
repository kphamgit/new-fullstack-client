import React, {useState, useContext, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionAttemptLive from './QuestionAttemptLive.js'
import { Link, useLocation } from 'react-router-dom';
import QuestionResponse from "./QuestionResponse.js";
import NextButtonLive from "./NextButtonLive.js";
import useExitPrompt from './useExitPrompt.js'
import {getNextQuestion} from './services/list.js'
import { SocketContext } from "./App.js";
import LiveScoreBoard from "./LiveScoreBoard.js";
import ChatPageTailwind from "./chat/ChatPageTailwind.js";


export default function QuizAttempLive() {
  const user = useSelector((state) => state.user.value) 
  const livequizflag = useSelector((state) => state.livequizflag.value) 

  
  const dispatch = useDispatch()  
    const [currentquestionnumber, setCurrentQuestionNumber] = useState(null)
    const [question, setQuestion] = useState(null) 
    const [showQuestion, setShowQuestion] = useState(false)
    const [showAttemptResponse, setShowQuestionAttemptResponse] = useState(false)
    const [attemptResponse, setAttemptResponse] = useState(null)
    const [myNextButtonFlag, setMyNextButtonFlag] = useState(false)
    //const [showExitPrompt, setShowExitPrompt] = useExitPrompt(true);
    const mounted = useRef(true);
    const socket = useContext(SocketContext);
   
    const currentLocation = useLocation()
  const arr = currentLocation.pathname.split('/')
  const quizId = arr[arr.length-1]

  useEffect(() => {
    socket.on('enable_next_button', (arg, callback) => {
       //console.log(" QuizAttempt got enable_next_button_ message arg=", arg)
        //callback({status: "I got enable_next_button message. OK", user_name: user.user_name, last_question_number: currentquestionnumber});
        if (arg.destination.indexOf("except") >= 0) {
          if (arg.target_student !== user.user_name) {
            //dispatch(setNextButtonFlag(arg.enable_flag)) 
            setMyNextButtonFlag(true)
          }
        }
        else if (arg.destination.indexOf('everybody') >= 0 ) { 
          //dispatch(setNextButtonFlag(arg.enable_flag))
          setMyNextButtonFlag(true)
        }
        else if (arg.destination.indexOf('only') >= 0 ) {
          if (arg.target_student === user.user_name) {
            //dispatch(setNextButtonFlag(arg.enable_flag)) 
            setMyNextButtonFlag(true)
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
    mounted.current = true;
      getNextQuestion(quizId, 1)
      .then((response) => {
        if(mounted.current) {
          setTheNextQuestion(response.data.question)
          setShowQuestion(true)     
          setMyNextButtonFlag(false)  
          const params = {
               user_name: user.user_name,
               question_number: 1
          }
          socket.emit("next_question_fetched", params)
        }
      })
      .catch(error => {
          console.log(error)
      });

    return () => mounted.current = false;
    },[dispatch, quizId, user.id, socket, user.user_name])

    const setShowQuestionFlag = (value) => {
       setShowQuestion(value)
    }

    const resetNextButtonFlag = () => {
      //this function is called in NextButton upon a question_attempt_id is created
      //from the server
      //console.log("calling reset ...")
       setMyNextButtonFlag(false)
    }

    return ( 
        <>
        
        <div style={{marginTop:"20px", marginLeft:"80px", marginRight:"50px"}}>
         <div><span className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
          <Link to='/' >Home</Link></span><span className="text-red-600">&nbsp;&nbsp;{user.user_name}</span>
         </div>
         <br />
         <div className="flex flex-row gap-2 bg-slate-200 justify-between">
         <div>
         {(showQuestion) ?
           <QuestionAttemptLive 
           question={question} 
           setShowQuestion={setShowQuestionFlag}
           setAttemptResponse={setTheAttemptResponse}
           />
          :
          <div>
            {showAttemptResponse && <QuestionResponse question={question} response_content={attemptResponse} />}
            { myNextButtonFlag &&
                <NextButtonLive quiz_id={quizId} 
                next_question_number={question.question_number + 1} 
                setNextQuestion={setTheNextQuestion}
                setShowQuestion={setShowQuestionFlag}
                resetNextButtonFlag = {resetNextButtonFlag}
                />
            }
          </div>
        }
         </div>
         <div className="bg-green-200">
            <span><LiveScoreBoard class_id={user.classId} /></span>
         </div>
      </div>
      <div><ChatPageTailwind layout = "flex_column"/></div>
      </div>
       </>
    )
    
}

