import React, {useContext,useEffect, useState} from 'react'
//mport Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import { SocketContext } from './App.js';
import ChatPage from './chat/ChatPage'
import RecordViewStudent from './RecordViewStudent.js'
import { setLiveQuizFlag } from '../redux/livequizflag.js';
import { useDispatch, useSelector } from 'react-redux';
//import { Button } from 'react-bootstrap';
//import { Button } from 'flowbite-react';
import { setLiveQuizId } from '../redux/livequizid.js';
import { clearLiveQuizId } from '../redux/livequizid.js';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from "flowbite-react";
import ChatPageTailwind from './chat/ChatPageTailwind.js';
export function HomeStudent({user}) {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [showRecordView, setShowRecordView] = useState(false)
    const livequizflag = useSelector(state => state.livequizflag.value)
    const livequizid = useSelector(state => state.livequizid.value)
    const [myLiveQuizId, setMyLiveQuizId] = useState()
    //const livescores = useSelector((state) => state.livescore.value)


    useEffect(() => {
      socket.on('enable_live_quiz', arg => {
          //console.log(" student receive scoreboard. arg.list: ",arg.list)
          //setStudentsList([...studentsList, arg.new_user])
          //for testing only
          //setStudentsListFromServer(arg.userlist)
          dispatch(setLiveQuizId(arg.quizid))
          /*
          arg.list.forEach( (row) => {
            //console.log("HEEEE row =",row)
            dispatch(addScore(row))
          })
          */
         dispatch(setLiveQuizFlag(true))
      })
      
      return () => {
          socket.off("scoreboard")
      }   
      //eslint-disable-next-line 
  }, [])
 
    const disableLiveQuiz = () => {
        dispatch(setLiveQuizFlag(false))
        dispatch(clearLiveQuizId())
    }
    const enableLiveQuiz = () => {
      if (!livequizid) {
        alert("Please ENTER quiz id.")
      }
      else if (livequizid.length === 0) {
        alert("Please ENTER quiz id.")
      }
      else {
        dispatch(setLiveQuizFlag(true))
      }
      
  }

    const toggleRecord = () => {
        setShowRecordView(!showRecordView)
      }
//  
    return (
        <>
        
        <div className="flex flex-col  h-80 gap-5 bg-green-100">
            <div className='h-1'>Live quiz: {livequizflag ? "ON" : "OFF"}<span> &nbsp; Quiz id: {livequizid}</span></div>
            <div className="flex flex-row h-72 gap-3 bg-red-200 justify-between">
                <div className="flex h-11 flex-row gap-4 ">
                  <Button onClick={enableLiveQuiz}>Turn Live Quiz On</Button>
                  <TextInput type='text' value={livequizid} size="7" 
                    onChange={(e) => dispatch(setLiveQuizId(e.target.value))}/>
                  <Button onClick={disableLiveQuiz}>Turn Live Quiz Off</Button>
                </div>
                <div className='bg-green-200'>
                   <ChatPageTailwind />
                </div>
            </div>
        </div>
        </>
    )
}
