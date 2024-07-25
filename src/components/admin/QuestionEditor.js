import React, { useEffect, useState} from 'react'
import { getAQuestion, updateQuestion } from '../services/list'

export function QuestionEditor({id}) {
    const [question, setQuestion] = useState({})
    const [questionPrompt, setQuestionPrompt] = useState('')
    useEffect(() => {
        getAQuestion(id)
        .then((response) => {
            setQuestion(response.data)
            setQuestionPrompt(response.data.prompt)
        })
    },[id])

    const updateAQuestion = () => {
        const params = {
            prompt: questionPrompt
        }
        updateQuestion(id, params )
        .then(response => {
            console.log("EEEE", response)
        })
    }

    return (
        <>
            <div>Question Prompt: {question.prompt}</div>
            <input type="text" value={questionPrompt} onChange={e => setQuestionPrompt(e.target.value)} />
            <button onClick={updateAQuestion}>Update</button>
        </>
    )
}
