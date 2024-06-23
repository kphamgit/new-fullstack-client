import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SubmitButton from './SubmitButton'
//import LiveSubmitButton from './LiveSubmitButton'
//import Button from "react-bootstrap/Button"
import format_cloze_question_content from './formatClozeQuestion'
import getClozeQuestionUserAnswer from './GetClozeQuestionUAnswer'
//import Button from "react-bootstrap/Button"
//import Counter from './Counter'

function ClozeQuestionAttempt({question, setUserAnswer, setElapsedTime}) {
    const [clozehtml, setClozehmtl] = useState('')
    
    const livequizflag = useSelector((state) => state.livequizflag.value)
    useEffect( () => {
        //console.log(" in useEffect quesiton=",question)
        const question_html = format_cloze_question_content(question)
        document.querySelectorAll('.cloze_answer').forEach( (x) => { x.value = '' } )
        setClozehmtl(question_html)
    },[question ])
  
  const handleClick = (elapsed_time) => {
    const user_answer = getClozeQuestionUserAnswer()
    //console.log("xxxxxxxxxx YYYYYYYYYYYYYYYYYY "+time)
    setElapsedTime(elapsed_time)
    
    if (user_answer.length === 0) {
      alert("Please enter input")
    }
    else {
      //call function from parent component (LiveQuestionAttempt) to set user answer
      setUserAnswer(user_answer)
    }
    
  }

  return (
    <>
    <div dangerouslySetInnerHTML={{ __html: clozehtml }}></div>
    <div style={{width:"60px"}}>
     
            <SubmitButton handleClick={handleClick} />
        
    </div>
    </>
  )
}

export default ClozeQuestionAttempt