import React, { useEffect, useRef, useState } from 'react'
import { getQuizWithQuestions } from '../services/list'
import {  Link, useLocation } from 'react-router-dom'
//import {DragDrop} from '../DragDrop'
import { DragDropTable } from '../DragDropTable'

export function QuestionsManager({quiz_id}) {
    const [quizName, setQuizName] = useState(null)
    const [subCatId, setSubCatId] = useState(null)
    const [rowsData, setRowsData] = useState([])
    const mounted = useRef(true)
    const headers = ['ID', 'Question Number' , 'Format']

    const location = useLocation();
    
    useEffect( () => {
        setSubCatId(location.state.subcat_id)
    },[location.state])
   
    useEffect(() => {
        mounted.current = true;
        getQuizWithQuestions(quiz_id)
        .then(response => {
            if(mounted.current) {
            setQuizName(response.data.name)
            const rows = []
                response.data.questions.forEach(question => {
                    const td_data = []
                      td_data.push(question.id)
                      td_data.push(question.question_number)
                      td_data.push(question.format)
                    rows.push(td_data)
                });
                setRowsData(rows)            
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
        <div className='m-12'>
            <div className='underline'><Link to="/">Home</Link></div>
            <div className='flex flex-col'>
              <div className='bg-gray-300 mt-5'>
                <Link className='underline text-red-600' to={`/sub_categories/${subCatId}`}>
                    Back
                </Link>
                <span className='text-cyan-600'>&nbsp;{quizName}</span>
              </div>
              <div className='bg-gray-200 h-1/2'>
              <DragDropTable headers={headers} data_rows = {rowsData} data_type='questions' />
             
              </div>
   

            </div>
            <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/1`}>Create Cloze Question</Link></div>
            <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/4`}>Create Radio Question</Link></div>
        </div>
    )

}
