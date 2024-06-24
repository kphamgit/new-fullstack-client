import React, {useEffect} from 'react'
//import CEditor from './code_editor/CEditor.js'
import io from "socket.io-client";
import { clear } from  '../redux/subcategory.js';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import { HomeStudent } from './HomeStudent.js';
import { HomeTeacher } from './HomeTeacher.js';
import { useSelector } from 'react-redux';

export const SocketContext = React.createContext();
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
//the following code DOES NOT make a connection. It just prevents
//an immediate connection
const socket = io.connect(URL, {
   autoConnect: false
});

function HomeSave() {
  const user = useSelector( state => state.user.value )
  useEffect(() => {
    // no-op if the socket is already connected
    //console.log(" ChatPage connecting to server")
    socket.connect();
    /* comment this out so that when the Home component dismounts, i.e, user
        go to another link, socket won't get disconnected.
        Leave to code here just for reference/learning
    return () => {
      socket.disconnect();
    };
    */
},[]);
  return (
    <>
    <SocketContext.Provider value={socket}>
    <Container style ={ { backgroundColor: 'orange'} }>
      <Row>
        <Col>
        { user.role === 'teacher' ?
        <HomeTeacher />
        :
        <HomeStudent />
        }
        </Col>
      </Row>
    </Container>
    </SocketContext.Provider>
     
    </>
  
  )
}

export default HomeSave