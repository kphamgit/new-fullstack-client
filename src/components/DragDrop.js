import React, { useState, useRef, useEffect} from 'react'

export function DragDrop({sorted_data}) {
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
        <div className='flex min-h-screen flex-col mx-10 items-center space-y-4'>
            <ul>
            { questions.map((question, index) => (
                <li key = {index} className='relative flex space-x-3 m-3 border rounded-p2 text-lg bg-gray-200'
                    draggable
                    onDragStart={() => (dragQuestion.current = index)}
                    onDragEnter={() => (draggedOverQuestion.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <span>{question.id}</span>
                    <span>{question.question_number}</span>
                    <span>{question.content}</span>
                    <span>EDIT</span>
                    <span>CLONE</span>
                    <span>DELETE</span>
                </li>
            ))
           
            }
            </ul>
        </div>
    )
}
