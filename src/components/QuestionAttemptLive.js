import React, {useState, useContext, useEffect} from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import { SocketContext } from "./App.js";
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import {SpeechRecognitionQA} from './SpeechRecognitionQA.js';


import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';

import axios from 'axios';
//import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import CEditor from './code_editor/CEditor';
import TextareaAutosize from 'react-textarea-autosize'

function QuestionAttemptLive({question, setShowQuestion, setAttemptResponse  }) {
   const [user_answer, setUserAnswer] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(null)
  const rootpath = useSelector((state) => state.rootpath.value)
  //const livequizflag= useSelector((state) => state.livequizflag.value)
  
  const user = useSelector((state) => state.user.value)

  const socket = useContext(SocketContext);
  
  const setTheUserAnswer = (value) => {
    //console.log("QUestionAttempt setTheUserAnswer value=", value)
    setUserAnswer(value)
  }
/*
  useEffect(() => {
        socket.emit('question_attempt_started', {
          user_name: user.user_name,
          question_number: question.question_number
        })
       //eslint-disable-next-line
  },[ user.user_name, question.question_number])
*/
  useEffect(() => {
    const process_question_attempt = async (user_answer) => {
      //console.log("in process ........1 user_answer=",user_answer)
      var url = `${rootpath}/api/question_attempts/process_live_attempt/${question.id}`
      const response = await axios.post(url,{user_answer: user_answer, question_id: question.id})
      //console.log("in process ........2 response data=",response.data)
      const live_score_params = {
        question_number: response.data.question_number, 
        score: response.data.question_attempt_results.score, 
        total_score: 0, user_name: user.user_name
      }
      //console.log("Emiting live score params =", live_score_params)
      socket.emit('live_score', live_score_params)
      setAttemptResponse({...response.data})
    } 
    if (user_answer != null) {
      process_question_attempt(user_answer, question.id)
      setShowQuestion(false)
    }
    //eslint-disable-next-line
  },[user_answer])


  const renderCurrentQA = () => {
    //return <ButtonSelectQuestionAttempt question={question} setUserAnswer={setTheUserAnswer} />
    
    switch (question.format) {
      case 1:
        return <ClozeQuestionAttempt 
            question={question} 
            setUserAnswer={setTheUserAnswer}
            setElapsedTime={setElapsedTime}
        />
        case 3:
          return <ButtonSelectQuestionAttempt question={question} setUserAnswer={setTheUserAnswer} />
        case 4: 
            return <Radio question={question} setUserAnswer={setTheUserAnswer} />
        case 6:
          return <WordsScrambler question={question} setUserAnswer={setTheUserAnswer} />
        case 7:
          return <SpeechRecognitionQA question={question} setUserAnswer={setTheUserAnswer} />
        case 8:
            return <WordsSelect question={question} setUserAnswer={setTheUserAnswer} />
        case 9:
              return <RecordQuestionAttempt />
      default:
        return null
    }
    
  }

    return (
      <>
      <div>Question: <span>{question.question_number}</span></div>
      
      <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
 
      <br />
      <TextareaAutosize className='bg-cyan-100' id="prompt" cols="70" value={question.prompt} />
    
      <div>
      {question.audio_src && <audio src={question.audio_src} controls />}
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}
    
     {  renderCurrentQA(question)  }
      </>
    )
}

export default QuestionAttemptLive