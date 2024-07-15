import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { Navbar } from "flowbite-react";
import { TailWindDropDown } from './TailWindDropDown';

function NavBarTailWind({categories}) {
    //const rootpath = useSelector((state) => state.rootpath.value)
  const user = useSelector((state) => state.user.value)
  return (
    <>
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TiengAnhTuyHoa</span>
      </Navbar.Brand>
     
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/logout" style={{color:"red"}}>{user.user_name} Log out</Navbar.Link>
        {categories.map(cat => 
            <TailWindDropDown key = {cat.id} category_name ={cat.name} sub_categories={cat.sub_categories} />
        )}  
      </Navbar.Collapse>
    </Navbar>
     <Outlet />
     </>
  );
  
}

export default NavBarTailWind