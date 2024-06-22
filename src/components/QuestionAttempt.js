import React, {useState, useEffect} from 'react'
import ButtonSelectQuestionAttempt from './ButtonSelectQA';
import ClozeQuestionAttempt from './ClozeQA';
import { Radio } from './Radio';
import WordsScrambler from './WordsScrambler';
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player';
import WordsSelect from './WordsSelect';
import RecordQuestionAttempt from './RecordQA';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


function QuestionAttempt({question, setShowQuestion, setAttemptResponse, questionAttemptId  }) {
   const [user_answer, setUserAnswer] = useState(null)
   //const [counter, setCounter] = useState(0) //counter for timeout
  const [elapsedTime, setElapsedTime] = useState(null)
  const rootpath = useSelector((state) => state.rootpath.value)
  
  const setTheUserAnswer = (value) => {
    //console.log("QUestionAttempt setTheUserAnswer value=", value)
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
    //this function is triggered by a change in user_answer state
    //see useEffect function above
    //console.log("in process ........1 user_answer=",user_answer)
      var url1 = rootpath + '/api/question_attempts/' + questionAttemptId + '/process_attempt'
      const firstRequest = await axios.post(url1,{user_answer: user_answer})
      const data1 = firstRequest.data
      //console.log("UUUUUUUUUUUUUUUUU", data1)
      var url2 = rootpath + '/api/question_attempts/' + questionAttemptId + '/test_doodle'
      await axios.post(url2,{code: question.prompt})
      setAttemptResponse({...data1, elapsed_time: elapsedTime})
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
      <TextareaAutosize id="prompt" cols="70" style={{ color:'#ebe7d8', backgroundColor:'#21043d'}}>{question.prompt}</TextareaAutosize>
      <div>
      {question.audio_src && <audio src={question.audio_src} controls />}
      </div> 
      {question.video_src && <ReactPlayer url={question.video_src} controls />}
      {  renderCurrentQA(question)  }
      </>
    )
}

export default QuestionAttempt