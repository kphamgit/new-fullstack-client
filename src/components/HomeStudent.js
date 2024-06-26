import React, {useContext,useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocketContext } from './App.js';
import ChatPage from './chat/ChatPage'
import RecordViewStudent from './RecordViewStudent.js'
import { setLiveQuizFlag } from '../redux/livequizflag.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { clearLiveQuizId, setLiveQuizId } from '../redux/livequizid.js';

export function HomeStudent(props) {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [showRecordView, setShowRecordView] = useState(false)
    const livequizflag = useSelector(state => state.livequizflag.value)
    const livequizid = useSelector(state => state.livequizid.value)
    const livescores = useSelector((state) => state.livescore.value)


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
 
    const enableLiveQuiz = () => {
        dispatch(setLiveQuizFlag(true))
    }

    const disableLiveQuiz = () => {
        dispatch(setLiveQuizFlag(false))
        dispatch(clearLiveQuizId())
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
        { livequizflag &&
          <span>&nbsp; Quiz id: &nbsp;{livequizid}</span>
        }
    </h5>
    <Container style ={ { backgroundColor: '#f2caa7'} }>
      <Row style ={ { backgroundColor: 'red', height:"90vh" }}>
        <Col style ={ { backgroundColor: '#f2caa7' }} xs={9}>
        <Row>
        <Col xs={4}>
          <Button variant="danger" onClick={enableLiveQuiz}>Turn on Live Quiz</Button>
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
