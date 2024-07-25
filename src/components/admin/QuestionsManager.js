import React, { useEffect, useRef, useState } from 'react'
import { getQuizWithQuestions } from '../services/list'
import { Link } from 'react-router-dom'
import {DragDrop} from '../DragDrop'
import { DragDropTable } from '../DragDropTable'

export function QuestionsManager({quiz_id}) {
    const [questions, setQuestions] = useState(null)
    const [quizName, setQuizName] = useState(null)
    const mounted = useRef(true)
    useEffect(() => {
        mounted.current = true;
        getQuizWithQuestions(quiz_id)
        .then(response => {
            if(mounted.current) {
            console.log(response.data)
            setQuestions(response.data.questions)
            setQuizName(response.data.name)
            }
        })
        return () => mounted.current = false;
    },[quiz_id])
    
    /*
    useEffect(() => {
        const shuffle = (array => { 
            return array.sort(() => Math.random() - 0.5); 
        });
        const shuffledArray = shuffle(people); 
        console.log(shuffledArray);
    },[])  
    */
    return (
        <DragDropTable sorted_data={questions}/>
    )
    /*
    return (
        <div className='m-14'>
        <div className='text-red-700 mb-3 '>Quiz: {quizName}</div>
        <div className='mb-1'>Questions:</div>
        <table className='ml-5'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Question Number</th>
                <th>Content</th>
            </tr>
        </thead>
        <tbody>
        { questions &&
        questions.map(question => 
            <tr key={question.id}>
                <td>{question.id}</td>
                <td>{question.question_number}</td>
                <td>{question.content}</td>
            </tr>
        )
        }
         </tbody>
    </table>
    <br />
    <div>NEW QUIZ</div>
        </div>
    )
    */
}
