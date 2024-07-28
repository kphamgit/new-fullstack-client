import React, { useEffect, useState } from 'react'
import { getUnitWithQuizzes } from '../services/list'
import { Link } from 'react-router-dom'
import { DragDropTable } from '../DragDropTable'
const headers = ['ID', 'Quiz Number' , 'Name']

export function QuizzesManager({unit_id}) {
    const [quizzes, setQuizzes] = useState(null)
    const [unitName, setUnitName] = useState(null)
    const [rowsData, setRowsData] = useState([])

    useEffect(() => {
        getUnitWithQuizzes(unit_id)
        .then(response => {
            //console.log(response.data.quizzes)
            setQuizzes(response.data.quizzes)
            const rows = []
            response.data.quizzes.forEach(quiz => {
                const td_data = []
                  td_data.push(quiz.id)
                  td_data.push(quiz.quiz_number)
                  td_data.push(quiz.name)
                rows.push(td_data)
            });
            setRowsData(rows)    
            setUnitName(response.data.name)
        })
    },[unit_id])

    return (
        <div className='mt-14 mx-14'>
        <div className='text-red-700 mb-3 '>Unit: {unitName}</div>
        <div className='mb-1'>Quizzes:</div>
    <DragDropTable headers={headers} data_rows = {rowsData} data_type='quizzes' />
    <div>NEW QUIZ</div>
        </div>
    )
}
