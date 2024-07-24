import React, { useEffect, useState } from 'react'
import { getQuizWithQuestions } from '../services/list'
import { Link } from 'react-router-dom'

export function QuestionsManager({quiz_id}) {
    const [questions, setQuestions] = useState(null)
    const [quizName, setQuizName] = useState(null)
    useEffect(() => {
        getQuizWithQuestions(quiz_id)
        .then(response => {
            console.log(response.data)
            setQuestions(response.data.questions)
            setQuizName(response.data.name)
        })
    },[quiz_id])

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
}
