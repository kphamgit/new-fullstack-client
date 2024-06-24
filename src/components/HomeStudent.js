import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import {SocketContext}  from './Home';
import { SocketContext } from './App.js';
import ChatPage from './chat/ChatPage'
import RecordViewStudent from './RecordViewStudent.js'
import { setLiveQuizFlag } from '../redux/livequizflag.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export function HomeStudent(props) {
    //const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [showRecordView, setShowRecordView] = useState(false)
    const livequizflag = useSelector(state => state.livequizflag.value)

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
    <h5>Live quiz: <span style={{color: livequizflag ? "green" : "red"  }}>
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
      
    </Container>
    
        </>
    )
}
