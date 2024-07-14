import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Unit from './Unit';
//import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '../redux/subcategory';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import {Link} from 'flowbite-react'


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
    <div style={{marginTop:"20px", marginLeft:"80px", marginRight:"50px"}}>
     
     <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"><a href='/' >Home</a></div>
     <br />
        <div className="grid grid-rows-1 gap-2 bg-indigo-200">
        {post.units && 
              <>
                {post.units.map((unit) =>  
                (<span key = {unit.id}>
                  <Unit content={unit}/>
                </span> 
                )
                )}
              </>}
        </div>
      </div>
  );
}