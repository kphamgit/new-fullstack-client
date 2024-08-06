import React, {useState, useEffect, useRef, useContext} from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import {SpeechRecognitionQA} from './SpeechRecognitionQA.js';
import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';
import {processQuestionAttempt} from './services/list.js'
//import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import CEditor from './code_editor/CEditor';
import TextareaAutosize from 'react-textarea-autosize'
import { FaPlayCircle } from "react-icons/fa";
import { PollyContext } from './App.js';
import AudioPlayer from './AudioPlayer.js';

function QuestionAttempt({question, setShowQuestion, setAttemptResponse, questionAttemptId  }) {
  const [user_answer, setUserAnswer] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(null)
  const [audioFile, setAudioFile] = useState('')
  const [audioEnded, setAudioEnded] = useState(false)
  
  const setTheUserAnswer = (value) => {
    setUserAnswer(value)
  }
  
  const polly = useContext(PollyContext)
  const audioRef = useRef()

  useEffect(() => {
    if (question.audio_str ) {
      const convertTextToSpeech = () => {
          polly.synthesizeSpeech({
            Engine: "generative",
            LanguageCode: "en-US",
            Text: question.audio_str,
            OutputFormat: 'mp3',
            VoiceId: "Ruth",
          },
          (error, data) => {
              if (error) {
                console.log(error);
              } else {
                setAudioFile(data)
              }
          })
      }
      convertTextToSpeech()
    }
  },[polly, question.audio_str])

  const playAudioString = () => {
      audioRef.current.playAudio()   
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
      <>
         <AudioPlayer audioFile={audioFile} setAudioEnded={setAudioEnded} ref={audioRef} />
      <div>Question: <span>{question.question_number}</span></div>
      
      <div dangerouslySetInnerHTML={{ __html: question.instruction }}></div>
      <div>{question.coding && 
          <CEditor questionAttemptId={questionAttemptId} codeSnippet = {question.prompt} />
      }</div>
      <br />
      { !question.coding &&
      <TextareaAutosize className='bg-cyan-100 w-full mr-3 px-3' id="prompt"  value={question.prompt} />
      }
    
      <div>
        { (question.audio_str && question.audio_str.trim().length > 0)  && 
         <FaPlayCircle onClick={playAudioString} className='text-xl m-3'/>
        }
        { (question.audio_src && question.audio_src.trim().length > 0) &&
           <audio src={question.audio_src} controls />
        }
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}
    
     {  renderCurrentQA(question)  }
      </>
    )
}

export default QuestionAttempt
//{question.audio_src && <audio src={question.audio_src} controls />}