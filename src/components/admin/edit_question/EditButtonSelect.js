import React, {useState, useEffect} from 'react'

export function EditButtonSelect({question_content, answer_key, set_answer_key}) {
        const [questionContent, setQuestionContent] = useState(null)
        const [choices, setChoices] = useState([])
        useEffect(() => {
            setQuestionContent(question_content)
            console.log(question_content)
        },[question_content])

        const handleChange = (value) => {
             set_answer_key(value)
        }

        const getAnswerKey = () => {
            const arr = questionContent.split('/')
            setChoices(arr)
            //set_answer_key(arr[0])
          }

    return (
        <div className='mx-14'>
        <div>
        { (choices.length > 0 ) && 
             <select onChange={event => handleChange(event.target.value)}>
               { choices.map( (choice, index) => {
                   if (choice === answer_key)
                     return (<option key={index} id={index} selected >{choice} </option>)
                   else
                     return (<option key={index} id={index} >{choice} </option>)
               })
               }
             </select>
        }
        <span className='text-white'>&nbsp;&nbsp;<button className='bg-green-600' onClick={getAnswerKey}>Get Answer Key</button></span>
        </div>
        </div>
    )
}
