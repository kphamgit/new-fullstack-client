import React, { useEffect, useState } from 'react'
import { getUnitWithQuizzes } from '../services/list'
import { Link } from 'react-router-dom'

export function QuizzesManager({unit_id}) {
    const [quizzes, setQuizzes] = useState(null)
    const [unitName, setUnitName] = useState(null)
    useEffect(() => {
        getUnitWithQuizzes(unit_id)
        .then(response => {
            //console.log(response.data.quizzes)
            setQuizzes(response.data.quizzes)
            setUnitName(response.data.name)
        })
    },[unit_id])

    return (
        <div className='m-14'>
        <div className='text-red-700 mb-3 '>Unit: {unitName}</div>
        <div className='mb-1'>Quizzes:</div>
        <table className='ml-5'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
        { quizzes &&
        quizzes.map(quiz => 
            <tr key={quiz.id}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td><Link to={`/quizzes/manage_questions/${quiz.id}`}>Manage Questions</Link></td>
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
