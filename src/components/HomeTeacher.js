import React, {useContext, useEffect, useState} from 'react'
import {SocketContext}  from './App.js';
import { setLiveQuizId } from '../redux/livequizid.js';
import { useDispatch, useSelector } from 'react-redux';
import ChatPageTailwind from './chat/ChatPageTailwind.js';
import { Button, TextInput } from 'flowbite-react';

export function HomeTeacher(props) {
    const socket = useContext(SocketContext);
    const [studentsList, setStudentsList] = useState([])
    const [studentsLisFromServer, setStudentsListFromServer] = useState([])
    const livequizid = useSelector(state => state.livequizid.value)
    const [targetStudent, setTargetStudent] = useState('everyone')
    const [enableNextQuestionAck, setEnableNextQuestionAck ] =useState([])
    const dispatch = useDispatch()

    const enableLiveQuiz = () => { 
        if (livequizid.trim()) {
            //console.log("MMMMMMMMMMM ")
          socket.emit('enable_live_quiz', {
            quizid: livequizid
          });
        }
        else {
            alert("Enter quiz id!")
            return
        }
    }

    const enableNextButton = () => {   
        socket.emit('enable_next_button', {
          to_student: targetStudent,
          enable_flag: 1
        });
  }
    //{new_user: user, userlist: users} )
    
    //io.emit("user_disconnected", {userlist: users})
    //
    useEffect(() => {
        socket.on('new_user', arg => {
            console.log(" new user. arg: ",arg)
            setStudentsList([...studentsList, arg.new_user])
            //for testing only
            setStudentsListFromServer(arg.userlist)
        })
        
        return () => {
            socket.off("new_user")
        }   
        //eslint-disable-next-line 
    }, [studentsList])
//
/*
useEffect(() => {
    
    socket.on('enable_button_acknowledged', arg => {
        console.log(" enable_button_acknowledged. arg: ",arg)
        setEnableNextQuestionAck([...enableNextQuestionAck, arg])
    })
    
    return () => {
        socket.off("enable_button_acknowledged")
    }   
    //eslint-disable-next-line 
}, [enableNextQuestionAck])
*/
    useEffect(() => {
        socket.on('user_disconnected', arg => {
            const filtered_list = studentsList.filter((user) => user.id !== arg.disconnected_user.id)
            //console.log(" filterd list = ", filtered_list)
            setStudentsList(filtered_list)
            setStudentsListFromServer(arg.userlist)
        })
        
        return () => {
            socket.off("user_disconnected")
        }   
        //eslint-disable-next-line 
    }, [studentsList])
 
    const cleartargetStudent = () => {
        setTargetStudent('')
    }

    const handleTargetStudentChoiceChange = (value) => {
            //console.log(value)
            if (value.indexOf('For everyone:') >= 0 ) {
                setTargetStudent('everyone')
            }
            else if (targetStudent.indexOf('everyone') >= 0 ) {
                setTargetStudent('')
            }
    }

    return (
        <>
        <div className="flex flex-col  h-80 gap-5 bg-green-100">
            <div className="flex flex-row h-72 gap-3 bg-red-200 justify-between">
                <div className="flex h-11 flex-row gap-4 ">
                  <Button onClick={enableLiveQuiz}>Turn Live Quiz On</Button>
                  <TextInput type='text' value={livequizid} size="7" 
                    onChange={(e) => dispatch(setLiveQuizId(e.target.value))}/>
                    <Button onClick={enableNextButton} >Enable Next Button</Button>
                </div>
                <div className='bg-green-200'>
                   <ChatPageTailwind />
                </div>
            </div>
        </div>
        <div>
        <div>Students list from server:</div>
        {
           studentsLisFromServer.map((student, index) =>
            <li style={{color:"green"}} key={ index }>{ student.username }, {student.id }</li>
            )
        }
        </div>
    </>
    )
}
