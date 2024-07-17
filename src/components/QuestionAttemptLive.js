import React, {useState, useContext, useEffect} from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import { SocketContext } from "./App.js";
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import {SpeechRecognitionQA} from './SpeechRecognitionQA.js';

import {processLiveQuestionAttempt} from './services/list.js'
import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';

//import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'

function QuestionAttemptLive({question, setShowQuestion, setAttemptResponse  }) {
   const [user_answer, setUserAnswer] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(null)
  
  const user = useSelector((state) => state.user.value)

  const socket = useContext(SocketContext);
  
  const setTheUserAnswer = (value) => {
    //console.log("QUestionAttempt setTheUserAnswer value=", value)
    setUserAnswer(value)
  }

useEffect(() => {
  if (user_answer != null)
    processLiveQuestionAttempt(question.id, user_answer)
    .then (response => {
      const live_score_params = {
        question_number: response.data.question_number, 
        score: response.data.question_attempt_results.score, 
        total_score: 0, user_name: user.user_name
      }
      socket.emit('live_score', live_score_params)
      setAttemptResponse({...response.data})
      setShowQuestion(false)
    })
  .catch(error => {
    console.log(error)
  });
   //eslint-disable-next-line
},[ user_answer])

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