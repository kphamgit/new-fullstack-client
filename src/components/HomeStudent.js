import React, {useContext,useEffect, useState} from 'react'
import { SocketContext } from './App.js';

import RecordViewStudent from './RecordViewStudent.js'
import { setLiveQuizFlag } from '../redux/livequizflag.js';
import { useDispatch, useSelector } from 'react-redux';
import { setLiveQuizId } from '../redux/livequizid.js';
import { clearLiveQuizId } from '../redux/livequizid.js';
import { Link } from 'react-router-dom';
import { Button, TextInput } from "flowbite-react";
import ChatPageTailwind from './chat/ChatPageTailwind.js';
export function HomeStudent({user}) {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [showRecordView, setShowRecordView] = useState(false)
    const livequizflag = useSelector(state => state.livequizflag.value)
    const livequizid = useSelector(state => state.livequizid.value)
    
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
            <div className="grid cols-1 w-full gap-4 bg-gradient-to-r from-cyan-400 to-orange-600 md:grid-cols-3 "
            >
                <div className='md:grid col-span-2'>
                  <div className="flex bg-gray-300 flex-row gap-4 justify-between">
                  <div className="flex m-2 h-11 flex-row gap-4 ">
                     <Button className='md: w-full px-0' onClick={enableLiveQuiz} >Turn Live Quiz On</Button>
                     <TextInput type='text' value={livequizid} size='auto' 
                     onChange={(e) => dispatch(setLiveQuizId(e.target.value))}/>
                     <Button className='m-0 w-full scroll-px-0' onClick={disableLiveQuiz}>Turn Live Quiz Off</Button>
                  <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                    <Link to='/matching_games' >Games</Link>
                  </div>
                 
                </div>
               
                  </div>
                  <RecordViewStudent />
                  <div  dangerouslySetInnerHTML={{ __html: user.message }}></div>  
                  <div className='h-1'>Live quiz: {livequizflag ? "ON" : "OFF"}<span> &nbsp; Quiz id: {livequizid}</span></div>
                </div>
                <div className='bg-gray-400 '>
                   <ChatPageTailwind />
                </div>
            </div>

        </>
    )
}
