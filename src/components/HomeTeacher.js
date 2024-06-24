import React, {useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SocketContext}  from './App.js';
import ChatPage from './chat/ChatPage'

export function HomeTeacher(props) {
    const socket = useContext(SocketContext);
    const enableNextButton = () => {   
          socket.emit('enable_next_button', {
            enable_flag: 1
          });
      }

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
            <button onClick={enableNextButton} >Send question number</button>
           <div>Recordingss</div>
        </Row>
    </Container>
    </>
    )
}
