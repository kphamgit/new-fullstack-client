import React, {useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SocketContext}  from './App.js';
import ChatPage from './chat/ChatPage'
import { setLiveQuizId } from '../redux/livequizid.js';
import { useDispatch, useSelector } from 'react-redux';

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
        <h3>Teacddher</h3>
        <Container style ={ { backgroundColor: 'brown'} }>
        <Row style = {{height: "70vh"}}>
        <Col style ={ {width: "80%", backgroundColor: 'green' }}>
                <div>{livequizid}</div>
                <div><button onClick={enableNextButton} >Enable Next Button</button>&nbsp;
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
                <div><button onClick={enableLiveQuiz} >Enable Live Quiz</button>&nbsp;
                    <input type="text"  onChange={e => dispatch(setLiveQuizId(e.target.value) ) } />
                </div>
            </Col>
            <Col style ={ {width: "20%" , backgroundColor: 'pink' }} >
                <ChatPage />
                 <br />
            </Col>
      </Row>
      <Row style = {{height: "30vh"}}>
        <Col>
        <div>Logged-in students:</div>
        {
            studentsList.map((student, index) =>
             <li style={{color:"yellow"}} key={ index }>{ student.username }, {student.id }</li>
             )
         }
         <div>Students list from server:</div>
        {
           studentsLisFromServer.map((student, index) =>
            <li style={{color:"yellow"}} key={ index }>{ student.username }, {student.id }</li>
            )
        }
        </Col>
        <Col>
        <div>Recordingss</div>
            </Col>
        </Row>
    </Container>
    </>
    )
}
