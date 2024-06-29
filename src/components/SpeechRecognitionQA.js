import React, {useState, useEffect} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import SubmitButton from './SubmitButton'

export function SpeechRecognitionQA({question, setUserAnswer}) {
    //const [isListening, setIsListening] = useState(false)
    //const [isMicBlocked, setIsMicBlocked] = useState(false)
    const [questioncontent, setQuestionContent] = useState([])
    const [questioncontent1, setQuestionContent1] = useState(["name", "age"])

    useEffect (() => {
        const arr = question.content.split('#')
        
        setQuestionContent( arr )
    },[question.content])
    
    const handleClick = () => {
        if (transcript.length === 0) {
            alert("Please answer")
            return
        }
        setUserAnswer(transcript)
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

   /*
 {
            studentsList.map((student, index) =>
             <li style={{color:"yellow"}} key={ index }>{ student.username }, {student.id }</li>
             )
         }
   */

    return (
        <>
            <p>&nbsp;</p>
            {
                questioncontent.map((sentence, index) => 
                    <p style={{ lineHeight:"0.8"}} key={ index }>{sentence}</p>
                )
            }
  
            <div>
      {listening ? <p>Listening ...</p> : <p>&nbsp;</p>}
      <button  style={{color:"white", backgroundColor: listening ? "green" : "red"  }} onClick={SpeechRecognition.startListening} disabled={listening}>Start</button>
      <button onClick={SpeechRecognition.stopListening} disabled={!listening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <br />
      <p>&nbsp;</p>
      <p>{transcript}</p>
      <SubmitButton handleClick={handleClick} />
    </div>
        </>
    )
}
