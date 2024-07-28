import React, {  useState, useEffect, } from 'react'
//import { createQuestion} from '../../services/list'

//import ReactQuill from 'react-quill-new';
//import 'react-quill/dist/quill.snow.css';

export function NewButtonSelect({question_content, set_answer_key}) {
        const [questionContent, setQuestionContent] = useState(null)
        const [choices, setChoices] = useState([])
        useEffect(() => {
            setQuestionContent(question_content)
        },[question_content])

        const handleChange = (value) => {
        //     let answer_str = ''
             set_answer_key(value)
        }

        const getAnswerKey = () => {
            const arr = questionContent.split('/')
            setChoices(arr)
            set_answer_key(arr[0])
          }

    return (
        <div className='mx-14'>
        <div>
        { (choices.length > 0 ) && 
             <select onChange={event => handleChange(event.target.value)}>
               { choices.map( (choice, index) => (
                    <option key={index} id={index} >{choice} </option>
                ))
               }
             </select>
        }
        <span className='text-white'>&nbsp;&nbsp;<button className='bg-green-600' onClick={getAnswerKey}>Get Answer Key</button></span>
        </div>
        </div>
    )
}
