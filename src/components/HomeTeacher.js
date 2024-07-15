import React, {useContext, useRef, useEffect, useState} from 'react'
import {SocketContext}  from './App.js';
import { setLiveQuizId } from '../redux/livequizid.js';
import { useDispatch, useSelector } from 'react-redux';
import ChatPageTailwind from './chat/ChatPageTailwind.js';
import { Button, TextInput } from 'flowbite-react';
import axios from 'axios';

export function HomeTeacher(props) {
    const socket = useContext(SocketContext);
    const rootpath = useSelector(state => state.rootpath.value)
    const [studentsList, setStudentsList] = useState([])
    const [studentsLisFromServer, setStudentsListFromServer] = useState([])
    const livequizid = useSelector(state => state.livequizid.value)
    const [targetStudent, setTargetStudent] = useState('everyone')
    const [studentsInClass, setStudentsInClass] = useState(null)
    const dispatch = useDispatch()
    const [classId, setClassId] = useState(null)
    //const mounted = useRef(true);

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
 
    /*
    useEffect(() => {
        mounted.current = true;
        var url = rootpath + '/api/classes/' + "1"
        axios.get(url).then((response) => {
            if(mounted.current) {
            console.log("EEEE", response.data)
            setStudentsInClass(response.data)
            }
        })
    },[rootpath])
    */
    const getStudentsInClass = (async () => {
        if(classId.length === 0 ) {
            alert("Enter Class ID")
            return
        }
        var url1 = rootpath + '/api/classes/' + classId
        const response = await axios.get(url1)
        
        setStudentsInClass(response.data)
    })

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
                <div className="flex h-12 flex-col gap-4 ">
                  <Button className='m-1' onClick={enableLiveQuiz}>Turn Live Quiz On</Button>
                  <TextInput type='text' value={livequizid} size="7" 
                    onChange={(e) => dispatch(setLiveQuizId(e.target.value))}/>
                    <Button className='m-1' onClick={enableNextButton} >Enable Next Button</Button>
                    <div>
                <select name="targetstudentchoice" onChange={event => handleTargetStudentChoiceChange(event.target.value)}>
                <option id="0" >For everyone:</option>
                <option id="1" >For only:</option>
                <option id="2" >For everyone except: </option>
                </select>
                <input type="text" value={targetStudent} onChange={e => setTargetStudent(e.target.value)} />
                <button onClick={cleartargetStudent} >Clear</button>
                </div>
                </div>
                <div className='bg-green-200'>
                   <ChatPageTailwind />
                </div>
            </div>
        </div>
        <div  className='flex flex-row bg-slate-300 justify-between'>
            <div>
            <div className='flex flex-row'>
                <Button onClick={getStudentsInClass} >Get students in class: </Button>
                &nbsp;<span><TextInput type='text' value={classId} size="7" 
                    onChange={(e) => setClassId(e.target.value)}/></span>
                </div>
               
                <ul>
                { studentsInClass &&
                studentsInClass.users.map((student, index) =>
                    <li style={{color:"green"}} key={ index }>{ student.user_name }</li>
                )
                }
                </ul>

            </div>
            <div> 
            <div>Connected students list from server:</div>
            <ul>
            {
                studentsLisFromServer.map((student, index) =>
                <li style={{color:"green"}} key={ index }>{ student.username }, {student.id }</li>
                )
            }
            </ul>
            </div>

        </div>
    </>
    )
}
