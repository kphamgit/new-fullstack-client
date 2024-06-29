import React, {useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SocketContext}  from './App.js';
import ChatPage from './chat/ChatPage'
import { setLiveQuizId } from '../redux/livequizid.js';
import { useDispatch, useSelector } from 'react-redux';

//const students_list = ["linhdan", "lockim", "khanhyen", "giabinh", "bichphuong", "basic3", "quocminh", "nhatminh"]
export function HomeTeacher(props) {
    const socket = useContext(SocketContext);
    const [studentsList, setStudentsList] = useState([])
    const [studentsLisFromServer, setStudentsListFromServer] = useState([])
    const livequizid = useSelector(state => state.livequizid.value)
    const [toStudent, setToStudent] = useState()
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
          to_student: toStudent,
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
        //user_name, question_number
        setEnableNextQuestionAck([...enableNextQuestionAck, arg])
    })
    
    return () => {
        socket.off("enable_button_acknowledged")
    }   
    //eslint-disable-next-line 
}, [enableNextQuestionAck])

    useEffect(() => {
        socket.on('user_disconnected', arg => {
            //console.log(" disconnected user :",arg.disconnected_user)
            //console.log(" current studentsList=", studentsList)
            //let user_index = studentsList.findIndex(e => e.id === arg.disconnected_user.id )
            //console.log(" disconnect user index in studentsList = "+user_index)
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
    //style={ { display: isLoggedIn ? 'block' : 'none' } }  
    //:"#e8dfda"
    return (
        <>
        <h3>Teacher</h3>
        <Container style ={ { backgroundColor: 'brown'} }>
      <Row>
        <Col style ={ {height: "70vh", backgroundColor: 'orange' }} >
        <ChatPage />
        <br />
        </Col>
      </Row>
      <Row>
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
            <Col>
            <div>{livequizid}</div>
            <div><button onClick={enableNextButton} >Enable Next Button</button>&nbsp;
            <input type="text" onChange={e => setToStudent(e.target.value)} /></div>
            <div><button onClick={enableLiveQuiz} >Enable Live Quiz</button>&nbsp;
            <input type="text"  onChange={e => dispatch(setLiveQuizId(e.target.value) ) } /></div>
          
        </Col>
        </Row>
    </Container>
    </>
    )
}
