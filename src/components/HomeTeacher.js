import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SocketContext}  from './Home';
import ChatPage from './chat/ChatPage'

export function HomeTeacher(props) {
    

    return (
        <>
        <h3>HOME teaher</h3>
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
           <div>Recordingss</div>
        </Row>
    </Container>
    </>
    )
}
