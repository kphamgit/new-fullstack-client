import React, {useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SocketContext}  from './Home';
import ChatPage from './chat/ChatPage'

export function HomeStudent(props) {
    const socket = useContext(SocketContext);

    return (
        <>
    
    <Container style ={ { backgroundColor: '#f2caa7'} }>
      <Row style ={ { backgroundColor: 'red', height:"90vh" }}>
        <Col style ={ { backgroundColor: '#f2caa7' }} xs={9}>
          
         <div>COL1</div>
        </Col>
        <Col style={{ height: "90vh", backgroundColor: "#e0b8c3"}} xs={3}>
              <ChatPage />
        </Col>
      </Row>
      
    </Container>
    
        </>
    )
}
