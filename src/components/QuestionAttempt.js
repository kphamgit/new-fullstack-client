import React, {useState, useContext, useEffect} from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import { SocketContext } from "./App.js";
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';


import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';

import axios from 'axios';
//import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import CEditor from './code_editor/CEditor';
import TextareaAutosize from 'react-textarea-autosize'

function QuestionAttempt({question, setShowQuestion, setAttemptResponse, questionAttemptId  }) {
   const [user_answer, setUserAnswer] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(null)
  const rootpath = useSelector((state) => state.rootpath.value)
  const livequizflag = useSelector((state) => state.livequizflag.value)
  const user = useSelector((state) => state.user.value)

  const socket = useContext(SocketContext);
  
  const setTheUserAnswer = (value) => {
    //console.log("QUestionAttempt setTheUserAnswer value=", value)
    setUserAnswer(value)
  }

  useEffect(() => {
      console.log("Starting question attempt")
      
      if(livequizflag) {
        socket.emit('question_attempt_started', {
          user_name: user.user_name,
          question_number: question.question_number
        })
      }
       //eslint-disable-next-line
  },[livequizflag, user.user_name, question.question_number])

  useEffect(() => {
    if (user_answer != null) {
      process_question_attempt(user_answer)
      setShowQuestion(false)
    }
    //eslint-disable-next-line
  },[user_answer])

  const process_question_attempt = async (user_answer) => {
    //console.log("in process ........1 user_answer=",user_answer)
      var url1 = rootpath + '/api/question_attempts/' + questionAttemptId + '/process_attempt'
      const response = await axios.post(url1,{user_answer: user_answer})
      const data = response.data
      console.log("response from process question attempt", data)
      //  socket.emit('live_score', {livequestionnumber: question.question_number, 
      //score: response_data.question_attempt_results.score, total_score: my_current_total,
      // user: user.user_name})
      //
//socket.emit('live_score', {livequestionnumber: question.question_number, score: response_data.question_attempt_results.score, total_score: my_current_total, user: user.user_name})
      if(livequizflag) {
        socket.emit('live_score', {
          livequestionnumber: data.question_number, 
          score: 5, 
          total_score: data.accumulated_score, user: user.user_name
        })
      }
      setAttemptResponse({...data, elapsed_time: elapsedTime})
  }

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
      <div>{question.coding && 
          <CEditor questionAttemptId={questionAttemptId} codeSnippet = {question.prompt} />
      }</div>
      { !question.coding &&
      <TextareaAutosize id="prompt" cols="70" style={{ color:'#ebe7d8', backgroundColor:'#21043d'}} value={question.prompt} />
    }
      <div>
      {question.audio_src && <audio src={question.audio_src} controls />}
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}
     <div>Question: <span>{question.question_number}</span></div>
     {  renderCurrentQA(question)  }
      </>
    )
}

export default QuestionAttempt