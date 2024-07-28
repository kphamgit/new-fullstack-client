import React, { useState, useRef} from 'react'
import { createQuestion} from '../../services/list'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import NewCloze  from './NewCloze';
import NewRadio  from './NewRadio';

export function NewQuestionNew({quiz_id}) {
    const [questionNumber, setQuestionNumber] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [questionContent, setQuestionContent] = useState('')
    const [answerKey, setAnswerKey] = useState('')
    const [score, setScore] = useState(null)
    const [instruction, setInstruction] = useState(null)
    const [help1, setHelp1] = useState(null)
    const [help2, setHelp2] = useState(null)
   
    const childRef = useRef();

    const navigate = useNavigate()
    const goToQuizQuestions =()=>{
      navigate(-1);
      
    }

    const currentLocation = useLocation()
    //console.log("current Location", currentLocation.pathname)
    const arr = currentLocation.pathname.split('/')
    const format = arr[arr.length-1]
    //console.log(format)

    const get_answer_key = () => {
        setAnswerKey(childRef.current.getAnswerKey(questionContent) )
    }
    //   
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
            console.log(params)
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
            <div>Quiz Id: {quiz_id}</div>
            <ReactQuill theme="snow" value={instruction} onChange={setInstruction} />
       
            <div className='bg-orange-950 mx-0 flex flex-col'>
                
                <div className='mx-10 text-white'><span>Question Number:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={questionNumber} onChange={e => setQuestionNumber(e.target.value)} />
                <div className='mx-10 text-white'><span>Prompt:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
                <div className='mx-10 text-white'><span>Content:</span></div>
                <input className='bg-slate-600 text-white' type="text" value={questionContent} onChange={e => setQuestionContent(e.target.value)} />
                <div className='mx-10 text-white'><span>Answer Key:</span><span>&nbsp;<button className='bg-green-600' onClick={get_answer_key}>Get Answer Key</button></span></div>
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
            <NewCloze ref={childRef}/>
        }
        { (format === "4") && 
        
            <NewRadio ref={childRef}/>
        }
        </>
    )
}
