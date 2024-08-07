import React, { useEffect, useRef, useState } from 'react'
import { getQuizWithQuestions } from '../services/list'
import {  Link, useLocation } from 'react-router-dom'
import getQuestionFormatStr from '../getQuestionFormatStr'
import { DragDropTable } from '../DragDropTable'
import { QuestionEditor } from './edit_question/QuestionEditor'

export function QuestionsManager() {
    const [quizName, setQuizName] = useState(null)
    const [subCatId, setSubCatId] = useState(null)
    const [rowsData, setRowsData] = useState([])
    const mounted = useRef(true)
    const headers = ['ID', 'Question Number' , 'Format', "  ", "  ", ""]
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [questionEditId, setQuestionEditId] = useState(null)

    const location = useLocation();

    const arr = location.pathname.split('/')
    const quiz_id = arr[arr.length-1]
  
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
                      td_data.push(getQuestionFormatStr(question.format))
                    rows.push(td_data)
                });
                setRowsData(rows)            
            }
        })
        return () => mounted.current = false;
    },[quiz_id])
    
    const parentFunction = (type, id, flag) => {
        switch(type) {
            case "EDIT":
                setQuestionEditId(id)
                setEditMode(flag)
              break;
            case "CREATE":
                //console.log("CREATE flag =",flag)
                setCreateMode(flag)
                break;
            default:
                console.log("valid Type")
        }
        //console.log("EEEEEENNNNNN",editFlag)
 
    }
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
                <span className='text-cyan-800'>&nbsp;{quizName}</span>
              </div>
              <div className='bg-gray-200 h-1/2'>
                { (editMode || createMode) ? 
                ( ( editMode ?
                  <QuestionEditor id={questionEditId} parentFunc = {parentFunction} />
                  :
                  <span>CREATE inside table</span>
                )
                )
                  :
                 (
                  <>  
                   <DragDropTable headers={headers} data_rows = {rowsData} data_type='questions' parentFunc ={parentFunction} />
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/${quiz_id}/1`}> Cloze Question</Link></div>
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/${quiz_id}/3`}> Button Select Question</Link></div>
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/${quiz_id}/4`}> Radio Question</Link></div>
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/${quiz_id}/6`}> Word Scramble Question</Link></div>
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/${quiz_id}/7`}> Speech Recognition Question</Link></div>
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/${quiz_id}/8`}> Words Select Question</Link></div>
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/${quiz_id}/9`}> Recording Question</Link></div></>
                   )
                }
                
              </div>
   

            </div>
 
        </div>
    )

}
