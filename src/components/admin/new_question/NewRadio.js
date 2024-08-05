import React, { forwardRef, useState, useEffect, useImperativeHandle} from 'react'
//import { createQuestion} from '../../services/list'
import { Label, Radio } from "flowbite-react";

//import ReactQuill from 'react-quill-new';
//import 'react-quill/dist/quill.snow.css';
import { NewQuestion } from './NewQuestion';

    const NewRadio= forwardRef(function NewRadio({question_content, set_answer_key}, ref) {
        const [questionContent, setQuestionContent] = useState(null)
     
        const [choice1Text, setChoice1Text] = useState('')
        const [choice2Text, setChoice2Text] = useState('')
        const [choice3Text, setChoice3Text] = useState('')
        const [choice4Text, setChoice4Text] = useState('')
        const [answerKey, setAnswerKey] = useState("choice1")
    
    useEffect(() => {
        setQuestionContent(question_content)
        set_answer_key('choice1')
    },[question_content, set_answer_key])

    const handleChange = (value) => {
        //setAnswerKey(value)
        set_answer_key(value)
    }
    useImperativeHandle(ref, () => ({
        getAnswerKey() {
            return answerKey
        },
        addParams(base_params) {
            const my_params = {
                choice_1_text: choice1Text,
                choice_2_text: choice2Text,
                choice_3_text: choice3Text,
                choice_4_text: choice4Text,
            }
            return {...base_params, ...my_params}
        }
      }));
      
    return (
        <>
        <div className='mx-12 my-10'>
    <fieldset className="flex max-w-md flex-col gap-4">
      <legend className="mb-4">Choose your favorite country</legend>
      <div className="flex items-center gap-2">
        <Radio onChange={e => handleChange(e.target.value)} id="choice1" name="choices" value="choice1" defaultChecked />
        <input type='text' value={choice1Text} size="60" onChange={e => setChoice1Text(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <Radio onChange={e => handleChange(e.target.value)} id="choice2" name="choices" value="choice2" />
        <input type='text' value={choice2Text} size="60" onChange={e => setChoice2Text(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <Radio onChange={e => handleChange(e.target.value)} id="choice3" name="choices" value="choice3" />
        <input type='text' value={choice3Text}  size="60"onChange={e => setChoice3Text(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <Radio onChange={e => handleChange(e.target.value)} id="choice4" name="choices" value="choice4" />
        <input type='text' value={choice4Text} size="60" onChange={e => setChoice4Text(e.target.value)} />
      </div>
    </fieldset>
    </div>
        </>
    )
})

export default NewRadio