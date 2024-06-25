import React, {useContext,useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LiveScoreBoard from './LiveScoreBoard.js'
import { SocketContext } from './App.js';
import ChatPage from './chat/ChatPage'
import RecordViewStudent from './RecordViewStudent.js'
import { setLiveQuizFlag } from '../redux/livequizflag.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addLiveScore } from '../redux/livescores';
import ScoreRow from './ScoreRow.js';

export function HomeStudent(props) {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [showRecordView, setShowRecordView] = useState(false)
    const livequizflag = useSelector(state => state.livequizflag.value)
    //const [loggedInStudentsList, setLoggedInStudentsList] = useState([])
    const livescores = useSelector((state) => state.livescore.value)

 /*
  useEffect(() => {
    loggedInStudentsList.forEach( (student) => {
      console.log(" new student is: "+student.username)
      console.log(" search in livescores for this student")
      const index = livescores.findIndex(person => person.student_name === student.username);
      console.log("MMMMMMMM index of this student is livescores is: = "+index);  // Output: 1
      if (index < 0 ) {
        //add loggedInStudent to livescores list
        console.log("Can't find this student in livescoreboard. Add him/her")
        dispatch(addLiveScore({student_name: student.username, question_number: null, score: null, total_score: null}))
      }
      //
  })
  },[loggedInStudentsList])
*/
    const enableLiveQuiz = () => {
        dispatch(setLiveQuizFlag(true))
    }

    const disableLiveQuiz = () => {
        dispatch(setLiveQuizFlag(false))
    }

    const toggleRecord = () => {
        setShowRecordView(!showRecordView)
      }
//  
    return (
        <>
    <h5>Live qqqquiz: <span style={{color: livequizflag ? "green" : "red"  }}>
        {livequizflag.toString()}
        </span>
    </h5>
    <Container style ={ { backgroundColor: '#f2caa7'} }>
      <Row style ={ { backgroundColor: 'red', height:"90vh" }}>
        <Col style ={ { backgroundColor: '#f2caa7' }} xs={9}>
        <Row>
          <Col xs={4}>
          <Button variant="info" onClick={enableLiveQuiz}>Turn On Live Quiz</Button>
          </Col>
          <Col xs={4}>
          <Button variant="danger" onClick={disableLiveQuiz}>Turn Off Live Quiz</Button>
          </Col>
        </Row>
        <br />
        <Button onClick={toggleRecord}>Show Record</Button>
          {showRecordView && <>
          <Row style ={ { backgroundColor: 'green', height:"30vh" } } >
          <RecordViewStudent />
          </Row>
          </> }
        </Col>
       
        <Col style={{ height: "90vh", backgroundColor: "#e0b8c3"}} xs={3}>
              <ChatPage />
        </Col>
      </Row>
      <Row>
      <div>SCOREBOARD</div>
        <ul className='scoreboard'>
                {livescores.map((score_data, index) => (
                    <li key={index}>
                           {score_data.student_name}
                            
                    </li>
                ))}
       </ul>
       </Row>
       
    </Container>
    
        </>
    )
}
