import React, { useEffect, useRef, useState } from 'react'
import { getQuizWithQuestions } from '../services/list'
import {  Link, useLocation } from 'react-router-dom'
//import {DragDrop} from '../DragDrop'
import { DragDropTable } from '../DragDropTable'
import { QuestionEditorNew } from './edit_question/QuestionEditorNew'
import { QuestionEditor } from './edit_question/QuestionEditor'

export function QuestionsManager({quiz_id}) {
    const [quizName, setQuizName] = useState(null)
    const [subCatId, setSubCatId] = useState(null)
    const [rowsData, setRowsData] = useState([])
    const mounted = useRef(true)
    const headers = ['ID', 'Question Number' , 'Format', "  ", "  ", ""]
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [questionEditId, setQuestionEditId] = useState(null)

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
                      switch(question.format) {
                        case 1:
                            td_data.push('Cloze (1)')
                          break;
                        case 3:
                            td_data.push('Button Select (3)')
                            break;
                        case 4:
                                td_data.push('Radio (4)')
                                break;
                        case 6:
                            td_data.push('Word Scramble (6)')
                            break;
                        case 7:
                            td_data.push('Speech Recognition (7)')
                            break;
                        case 8:
                                td_data.push('Words Select (8)')
                                break;
                        case 9:
                            td_data.push('Recording (9)')
                          break;
                        default:
                            td_data.push('Unknown format')
                      }
                      //td_data.push(question.format)
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
                console.log("CREATE")
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
                { editMode ? 
                  <QuestionEditorNew id={questionEditId} parentFunc = {parentFunction} />
                  :
                 (
                  <>  
                   <DragDropTable headers={headers} data_rows = {rowsData} data_type='questions' parentFunc ={parentFunction} />
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/1`}>Create Cloze Question</Link></div>
                   <div className='bg-blue-200 underline mt-5'><Link to={`/questions/create/4`}>Create Radio Question</Link></div>
                    </>
                   )
                }
              </div>
   

            </div>
 
        </div>
    )

}
