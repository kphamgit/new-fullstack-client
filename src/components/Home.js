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


function Home({socket}) {
  const user = useSelector( state => state.user.value )
  
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
    </Container>
    </>
  )
}

export default Home