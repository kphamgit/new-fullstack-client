import React, { useState, useRef, useEffect} from 'react'
import { createQuestion} from '../../services/list'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import NewCloze  from './NewCloze';
import NewRadio  from './NewRadio';
import { NewButtonSelect } from './NewButtonSelect';
import NewWordsScramble  from './NewWordsScramble';
import getQuestionFormatStr from '../../getQuestionFormatStr';

export function NewQuestion({quiz_id}) {
    const [questionNumber, setQuestionNumber] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [questionContent, setQuestionContent] = useState('')
    const [answerKey, setAnswerKey] = useState('')
    const [score, setScore] = useState(5)
    const [instruction, setInstruction] = useState(null)
    const [help1, setHelp1] = useState(null)
    const [help2, setHelp2] = useState(null)
    const [formatStr, setFormatStr] = useState(null)
   
    const childRef = useRef();

    const navigate = useNavigate()
    const goToQuizQuestions =()=>{
      navigate(-1);
      
    }

    const currentLocation = useLocation()
    const arr = currentLocation.pathname.split('/')
    const format = arr[arr.length-1]
    useEffect(() => {
        setFormatStr(getQuestionFormatStr(parseInt(format)))
    },[format])
 
    const createAQuestion = () => {
        let params = {
            format: format,
            question_number: questionNumber,
            instruction: instruction,
            prompt: prompt,
            content: questionContent,
            answer_key: answerKey,
            score: score,
            quizId: quiz_id,
            help1: help1
        }
        if (format === "4") {  //format coming from route is a character
            params = childRef.current.addParams(params)
        }
        if (format === '6') {
            params = childRef.current.addParams(params)
            
        }
        createQuestion(params )
        .then(response => {
            goToQuizQuestions()
        })
    }

    return (
        <>
        <div className='m-10'>
        <div className='underline'><Link to="/">Home</Link></div>
        <div className='mx-5 mt-2'>
            <button className='underline text-red-600 ' onClick={goToQuizQuestions}>Back</button>
            <div className='text-blue-600'>New {formatStr} </div>
            <ReactQuill theme="snow" value={instruction} onChange={setInstruction} />
       
            <div className='bg-orange-950 mx-0 flex flex-col'>
                
                <div className='mx-10 text-white'><span>Question Number:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={questionNumber} onChange={e => setQuestionNumber(e.target.value)} />
                <div className='mx-10 text-white'><span>Prompt:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
                <div className='mx-10 text-white'><span>Content:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={questionContent} onChange={e => setQuestionContent(e.target.value)} />
                <div className='mx-10 text-white'><span>Answer Key:</span><span>&nbsp;</span></div>
                <input className='bg-slate-600 text-white' type="text" value={answerKey} onChange={e => setAnswerKey(e.target.value)} />
                <div className='mx-10 text-white'><span>Score:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={score} onChange={e => setScore(e.target.value)} />
                <div className='mx-10 text-white'><span>Help1:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={help1} onChange={e => setHelp1(e.target.value)} />
            <div>
            
            <button className='text-gray-900 bg-orange-400 w-1/6' onClick={createAQuestion}>Create</button>
            </div>
            
            </div>
        </div>
        </div>
        { (format === "1") && 
            <NewCloze question_content={questionContent} set_answer_key ={setAnswerKey} />
        }
         { (format === "3") &&  
        <NewButtonSelect ref={childRef} question_content={questionContent} set_answer_key ={setAnswerKey} />
        }
        { (format === "4") && 
        
            <NewRadio ref={childRef} question_content={questionContent} set_answer_key ={setAnswerKey} />
        }
        { (format === "6") && 
        
        <NewWordsScramble ref={childRef} question_content={questionContent} set_answer_key ={setAnswerKey} />
        }
        </>
    )
}
