import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from './App.js';
import { useDispatch } from 'react-redux';
import { setScores } from '../redux/livescores';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
//import axios from 'axios';
//import { setShowLiveQuestion } from '../redux/showlivequestion';
//import { setQuestion } from '../redux/livequestion';

function ScoreRow({score_data }) {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [rowStudentName, setRowStudentName] = useState(null)
    //const user = useSelector((state) => state.user.value)
    const [totalScore, setTotalScore] = useState(null)
    const [score, setScore] = useState(null)

    useEffect(() => {
        setRowStudentName(score_data.student_name)
    },[score_data])

    useEffect(() => {
        socket.on('live_score', arg => {
            
            //console.log("Live score for user =", arg.user, "***")
            //console.log("Row's student name:="+rowStudentName,"***")
            
            let it_s_for_me = false
            if (arg.user.trim() === rowStudentName.trim()) {
                it_s_for_me = true
            }
            
            //const it_s_for_me = () => (arg.user.trim() === rowStudentName.trim()) doesn't work
            if (it_s_for_me) {
                //console.log("YES ********** it's for me")
                setTotalScore(previous => {
                    if (previous === null) {
                        return arg.score
                    }
                    else {
                        return previous + arg.score
                    }
                });
                //setScore(arg.score)
                /*
                dispatch(setScores({student_name: arg.user.trim(), question_number: arg.livequestionnumber, score: arg.score, total_score: totalScore}))
                */
            }
            
        })
        return () => {
            socket.off("live_score")
        }   
    }, [socket, rowStudentName])

//eslint-disable-next-line 

    useEffect(() => {
        socket.on('question_attempt_started', (arg) => {
            //console.log("I am a ScoreRow. My student name is: "+score_data.student_name)
            console.log("I just received a question_attempt_started message from user: "+arg.user_name)
        })
        return () => {
            socket.off("question_attempt_started")
        }   
    },[socket])
//

  return (
    <>
        <span style={{color:"blue"}}>&nbsp;{rowStudentName}</span>
        <span style={{color:"green"}}>&nbsp;&nbsp;{score_data.question_number}</span>
        <span style={{color:"blue"}}>&nbsp;&nbsp;{score}</span>
        <span>&nbsp;&nbsp;</span>
        <span className='total_score' style={{color:"brown"}}>{totalScore}</span>
    </>
  )
}

export default ScoreRow