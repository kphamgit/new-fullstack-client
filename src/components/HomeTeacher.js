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
    const dispatch = useDispatch()

    const sendScoreBoard = () => {   
          socket.emit('scoreboard', {
            quizid: livequizid,
            list: [
                {student_name: "basic2", question_number: null, score: null, total_score: null},
                {student_name: "basic4", question_number: null, score: null, total_score: null},
            ]
          });
    }

    const enableNextButton = () => {   
        socket.emit('enable_next_button', {
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

    useEffect(() => {
        socket.on('user_disconnected', arg => {
            console.log(" disconnected user :",arg.disconnected_user)
            console.log(" current studentsList=", studentsList)
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
    
    return (
        <>
        <h3>Teacher</h3>
        <Container style ={ { backgroundColor: 'brown'} }>
      <Row>
        <Col style ={ {height: "70vh", backgroundColor: 'green' }} xs={9}> 
        </Col>
        <Col style ={ {height: "70vh", backgroundColor: 'orange' }} >
        <ChatPage />
        <br />
        </Col>
      </Row>
      <Row>
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
      </Row>
        <Row>
            <div>{livequizid}</div>
            <button onClick={sendScoreBoard} >Send ScoreBoard</button>
            <input type="text"  onChange={e => dispatch(setLiveQuizId(e.target.value) ) } />
            <button onClick={enableNextButton} >Enable Next Button</button>
           <div>Recordingss</div>
        </Row>
    </Container>
    </>
    )
}
