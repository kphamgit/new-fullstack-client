import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from './App.js';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function ScoreRow({student_name }) {
    const socket = useContext(SocketContext);
    const [studentName, setStudentName] = useState(student_name.trim())
    const [questionNumber, setQuestionNumber] = useState(null)
    const [score, setScore] = useState(null)
    const [totalScore, setTotalScore] = useState(null)
    
    useEffect(() => {
        socket.on('live_score', arg => {
            let it_s_for_me = false
            if (arg.user_name.trim() === studentName) {
                it_s_for_me = true
            }
            //const it_s_for_me = () => (arg.user.trim() === studentName.trim()) doesn't work??
            if (it_s_for_me) {
                setQuestionNumber(arg.question_number)     
                setScore(arg.score) 
                setTotalScore(previous => {
                    if (previous === null) {
                        return arg.score
                    }
                    else {
                        return previous + arg.score
                    }
                });
            }
            
        })
        return () => {
            socket.off("live_score")
        }   
    }, [socket, studentName])

    useEffect(() => {
        socket.on('next_question_fetched', (arg) => {
            //console.log("I am a ScoreRow. My student name is:***"+studentName+"****")
            //console.log("I just received a next_question_fetched message from user***", arg.user_name, "***")
            let it_s_for_me = false
            if (arg.user_name.trim() === studentName) {
                it_s_for_me = true
            }
            if (it_s_for_me) {
                setQuestionNumber(arg.question_number)
            }
            
        })
        return () => {
            socket.off("question_attempt_started")
        }   
    },[socket, studentName])
//

  return (
    <>
        <span style={{color:"blue"}}>&nbsp;{studentName}</span>
        <span style={{color:"green"}}>&nbsp;&nbsp;{questionNumber}</span>
        <span style={{color:"blue"}}>&nbsp;&nbsp;{score}</span>
        <span>&nbsp;&nbsp;</span>
        <span className='total_score' style={{color:"brown"}}>{totalScore}</span>
    </>
  )
}

export default ScoreRow