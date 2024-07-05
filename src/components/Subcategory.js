import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Unit from './Unit';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '../redux/subcategory';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//import { BrowserRouter } from 'react-router-dom';
export default function Subcategory({id, name}) {
  
  const rootpath = useSelector((state) => state.rootpath.value)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSubcategory(name))
  })
 
  const [post, setPost] = useState([]);
 
  const url = `${rootpath}/api/sub_categories/${id}`

  useEffect(() => {
    //console.log(" 3) in sub_cat useEffect. About to call axios")
    axios.get(url).then((response) => {
      setPost(response.data);
      response.data.units.sort( (a,b) => { return a.unit_number - b.unit_number; } )
  
    });
  }, [url]);
 
  return(
    <>
      <Container>
          <Row>
            <Col style={{backgroundColor: "#f5ebe4"}}>
            
            {post.units && 
              <ul>
                {post.units.map((unit) =>  
                (<ListGroup key = {unit.id}>
                  <Unit content={unit}/>
                </ListGroup> 
                )
                )}
              </ul>}
            </Col>
          </Row>
      </Container>
      </>
  );
}