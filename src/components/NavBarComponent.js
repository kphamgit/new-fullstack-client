import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import NavBarButton from './NavBarButton';
//import Button from 'react-bootstrap/Button';
//import { setTokenValue } from '../redux/token';
import {  useSelector } from 'react-redux';

function NavBarComponent({categories}) {
    //const rootpath = useSelector((state) => state.rootpath.value)
  const user = useSelector((state) => state.user.value)
  //const dispatch = useDispatch()

  return (
    <>
    <Navbar bg="primary" data-bs-theme="light">
      <Container>
        <Navbar.Brand style={{color:"orange"}} href="#home">English Tuyhoa</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/" style={{color:"white"}}>Home</Nav.Link>
        <Nav.Link as={Link} to="/logout" style={{color:"orange"}}>{user.user_name} Log out</Nav.Link>
        {categories.map(cat => 
       <li key={cat.id}><NavBarButton title={cat.name} subcategories={cat.sub_categories}/>
        </li>
        )}  
        </Nav>
      </Container>
   
    </Navbar>
    <Outlet />
  </>
  )
}

export default NavBarComponent