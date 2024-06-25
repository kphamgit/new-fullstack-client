import React, {useState, useEffect} from 'react'
//import CEditor from './code_editor/CEditor.js'
import io from "socket.io-client";
import { clear } from  '../redux/subcategory.js';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import { HomeStudent } from './HomeStudent.js';
import { HomeTeacher } from './HomeTeacher.js';
import { useSelector } from 'react-redux';
import { ConnectionState } from './ConnectionState';

function Home({socket}) {
  const user = useSelector( state => state.user.value )
  const [isConnected, setIsConnected] = useState(socket.connected);
  
useEffect(() =>{
  function onConnect() {
    setIsConnected(true);
    socket.emit("join", {username: user.user_name})
  }
    socket.on('connect', onConnect)
    return () => {
      socket.off('connect', onConnect);
    };
    //eslint-disable-next-line
},[user.user_name])

  useEffect(() => {
    // no-op if the socket is already connected
    //console.log(" ChatPage connecting to server")
    socket.connect();
    //
    // comment this out so that when the Home component dismounts, i.e, user
    //    go to another link, socket won't get disconnected.
    //    Leave to code here just for reference/learning
    //return () => {
    //  socket.disconnect();
    //};
    //eslint-disable-next-line
},[]);

  return (
    <>
    
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
      <ConnectionState isConnected={ isConnected } />
    </Container>
    </>
  )
}

export default Home