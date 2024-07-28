import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'

const NewWordsScramble= forwardRef(function NewWordsScramble({question_content, set_answer_key}, ref) {
//export function NewWordsScramble({question_content, set_answer_key}) {
        const [questionContent, setQuestionContent] = useState(null)
        const [direction, setDirection] = useState([])

        useEffect(() => {
            setQuestionContent(question_content)
        },[question_content])

        const handleChange = (value) => {
             setDirection(value)
        }

        const getAnswerKey = () => {
            //const arr = questionContent.split('/')
            //setChoices(arr)
            set_answer_key(question_content)
          }
          
          useImperativeHandle(ref, () => ({
            addParams(base_params) {
                const my_params = {
                    words_scramble_direction: direction,
                }
                return {...base_params, ...my_params}
            }
          }));
          
    return (
        <div className='mx-14'>
        <div>
      
             <select onChange={event => handleChange(event.target.value)}>
               { ["x", "y"].map( (choice, index) => (
                    <option key={index} id={index} >{choice} </option>
                ))
               }
             </select>
    
        <span className='text-blue-700'>&nbsp;&nbsp;Direction</span>
         </div>
         <div className='mt-4'>
         <span className='text-white '>&nbsp;&nbsp;<button className='bg-green-600' onClick={getAnswerKey}>Get Answer Key</button></span>
         </div>
        </div>
    )
})

export default NewWordsScramble