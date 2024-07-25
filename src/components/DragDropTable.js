import React, { useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'

export function DragDropTable({sorted_data}) {
    const [questions, setQuestions] = useState([])
    
    useEffect(() => {
        setQuestions(sorted_data)
    },[sorted_data])
   
    const dragQuestion = useRef(0)
    const draggedOverQuestion = useRef(0)
    const handleSort = () => {
        const questionsClone = [...questions]
        const temp = questionsClone[dragQuestion.current]
        questionsClone[dragQuestion.current] = questionsClone[draggedOverQuestion.current]
        questionsClone[draggedOverQuestion.current] = temp
        setQuestions(questionsClone)
    }
    return (
        <div className='flex min-h-screen flex-col mt-14 mx-10 items-center space-y-4'>
            <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Question Number</th>
                    <th>Format</th>
                    <th>Content</th>
                </tr>
              </thead>
            <tbody>
            { questions && questions.map((question, index) => (
                <tr>
                    <td
                     key = {index} className='relative flex space-x-3 m-2 border rounded-p2 text-lg bg-gray-200'
                     draggable
                     onDragStart={() => (dragQuestion.current = index)}
                     onDragEnter={() => (draggedOverQuestion.current = index)}
                     onDragEnd={handleSort}
                     onDragOver={(e) => e.preventDefault()}
                    >{question.id}</td>
                    <td>{question.question_number}</td>
                    <td>{question.format}</td>
                    <td>{question.content}</td>
                    <td><Link to={`/questions/edit/${question.id}`}>Edit</Link></td>
                    <td>CLONE</td>
                </tr>
            ))
            }
            </tbody>
            </table>
        </div>
    )
}

/*
            <table>
              <thead>
                <tr>
              <th>ID</th>
                  <th>Id</th>
                  <th>Question Number</th>
                  <th>Format</th>
                  <th>Content</th>
                  </tr>
              </thead>
                <tbody>
              
                { questions.map(quiz_attempt => (
                     <tr  key={quiz_attempt.id }>
                          <td >{quiz_attempt.id }</td>
                          <td className='text-blue-600'>{quiz_attempt.user_name }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.completion_status }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.score }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.createdAt}&nbsp;&nbsp;</td>
                        
                      </tr>
                ))
                }
                </tbody>
            </table>
*/