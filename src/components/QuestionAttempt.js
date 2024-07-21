import React, {useState, useEffect} from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import {SpeechRecognitionQA} from './SpeechRecognitionQA.js';
import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';
import {processQuestionAttempt} from './services/list.js'
import { Textarea } from 'flowbite-react';
//import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import CEditor from './code_editor/CEditor';
import TextareaAutosize from 'react-textarea-autosize'

function QuestionAttempt({question, setShowQuestion, setAttemptResponse, questionAttemptId  }) {
  const [user_answer, setUserAnswer] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(null)
  
  const setTheUserAnswer = (value) => {
    setUserAnswer(value)
  }

  useEffect(() => {
    if (user_answer != null) {
      process_question_attempt(user_answer)
      setShowQuestion(false)
    }
    //eslint-disable-next-line
  },[user_answer])
  
  const process_question_attempt = async (user_answer) => {
    processQuestionAttempt(questionAttemptId, user_answer)
    .then((response) => {
      setAttemptResponse({...response.data, elapsed_time: elapsedTime})
    })
    .catch(error => {
        console.log(error)
    });
  }

  const renderCurrentQA = () => {

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
      <div className='bg-green-200'>
        <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
          <TextareaAutosize className='w-[70vw]' id="prompt" value={question.prompt} />
          <div>
      {question.audio_src && <audio src={question.audio_src} controls />}
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}
    
     {  renderCurrentQA(question)  }
      </div>
    )
}

export default QuestionAttempt