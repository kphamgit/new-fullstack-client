import React, { useEffect, useRef, useState} from 'react'
import { getAQuestion, updateQuestion } from '../../services/list'
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import EditRadio from './EditRadio';
import { EditButtonSelect } from './EditButtonSelect';
import EditWordsScramble from './EditWordsScramble';

export function QuestionEditorNew({id, parentFunc}) {
    const [format, setFormat] = useState(null)
    const [quizId, setQuizId] = useState(null)
    const [questionNumber, setQuestionNumber] = useState(null)
    const [prompt, setPrompt] = useState(null)
    const [questionContent, setQuestionContent] = useState('')
    const [answerKey, setAnswerKey] = useState('')
    const [score, setScore] = useState(null)
    const [instruction, setInstruction] = useState(null)
    const [help1, setHelp1] = useState(null)
    const [help2, setHelp2] = useState(null)
    const [radioContent, setRadioContent] = useState({})
    const [direction, setDirection] = useState(null)
    const childRef = useRef()
   
    useEffect(() => {
        getAQuestion(id)
        .then((response) => {
            
            setQuizId(response.data.quizId)
            setFormat(response.data.format)
            setQuestionNumber(response.data.question_number)
            setInstruction(response.data.instruction)
            setPrompt(response.data.prompt)
            setQuestionContent(response.data.content)
            setAnswerKey(response.data.answer_key)
            setScore(response.data.score)
            if (response.data.radio != null) {
                setRadioContent(response.data.radio)
            }
            if (response.data.format === 6) {
                //console.log("SCRAMMMMMMMMM direction =", response.data.direction)
                setDirection(response.data.words_scramble_direction)
            }
        })
    },[id])

    const get_answer_key = () => {
        setAnswerKey(childRef.current.getAnswerKey(questionContent) )
    }
       
    const updateAQuestion = () => {
        let params = {
            format: format,
            instruction: instruction,
            prompt: prompt,
            content: questionContent,
            answer_key: answerKey,
            score: score,
            help1: help1
        }
        
        if (format === 4) {    //format coming from database is an integer
            params = childRef.current.addParams(params)
        }
        if (format === 6) {
            params = childRef.current.addParams(params)
        }
        console.log(params)
        
        updateQuestion(id, params )
        .then(response => {
            parentFunc("EDIT", 1, false)
        })
        
    }

    return (
        <>
        <div className='m-4'>
        <div className='mx-4 mt-1'>
        
        <div>Question: <span className='w-6 h-6 rounded-full border-2 border-black flex justify-center items-center'>{questionNumber}</span>
            </div>
       
            <ReactQuill theme="snow" value={instruction} onChange={setInstruction} />
       
            <div className='bg-orange-950 mx-0 flex flex-col'>
            
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
            <button className='text-gray-900 bg-orange-400 w-1/6' onClick={updateAQuestion}>Update</button>
            <button className='text-gray-900 bg-cyan-400 w-1/6' onClick={() => parentFunc("EDIT", 1 ,false)}>Cancel</button>
            </div>
            
            </div>
        </div>
        </div>
        { (format === 3) &&  
        <EditButtonSelect ref={childRef} question_content={questionContent} answer_key={answerKey} set_answer_key ={setAnswerKey} />
        }
        { (format === 4) && 
        <EditRadio radio_data = {radioContent} ref={childRef}/>
         }
        { (format === 6) &&  
        <EditWordsScramble ref={childRef} question_content={questionContent} drag_direction={direction} set_answer_key ={setAnswerKey} />
        }
         
        </>
    )
}
