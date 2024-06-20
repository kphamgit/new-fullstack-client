import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import NavBarButton from './NavBarButton';
//import Button from 'react-bootstrap/Button';
//import { setTokenValue } from '../redux/token';
//import { useDispatch, useSelector } from 'react-redux';

function NavBarComponent({categories}) {
    //const rootpath = useSelector((state) => state.rootpath.value)
  //const username = useSelector((state) => state.username.value)
  //const dispatch = useDispatch()

  return (
    <>
    <Navbar bg="primary" data-bs-theme="light">
      <Container>
        <Navbar.Brand style={{color:"orange"}} href="#home">English Tuyhoa</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/" style={{color:"orange"}}>Home</Nav.Link>
        <Nav.Link as={Link} to="/logout" style={{color:"orange"}}>Log out</Nav.Link>
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