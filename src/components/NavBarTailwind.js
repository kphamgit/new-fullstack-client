import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { Navbar } from "flowbite-react";
import { TailWindDropDown } from './TailWindDropDown';
import {FaMoon} from 'react-icons/fa'
import { Button } from 'flowbite-react';

//https://www.youtube.com/watch?v=6Py5hupjDjk
//youtube coding cleverly 

function NavBarTailWind({categories}) {
    //const rootpath = useSelector((state) => state.rootpath.value)
  const user = useSelector((state) => state.user.value)
  return (
    <>
     <Navbar className='mx-10 my-2 bg-green-300 border-b-1 rounded-md'>
     <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TiengAnhTuyHoa</span>
      </Navbar.Brand>
        <div className='flex gap-2 md:order-2'>
          <Button className='w-12 h-10 sm-inliine'
              color="gray"
              pill
              >
               <FaMoon />
          </Button>
          <Link to="/">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
        <Navbar.Link as={Link} to="/logout" style={{color:"brown"}}>{user.user_name} Log out</Navbar.Link>
        {categories.map(cat => 
            <TailWindDropDown key = {cat.id} category_name ={cat.name} sub_categories={cat.sub_categories} />
        )}  
      </Navbar.Collapse>
     </Navbar>
     </>
  );
  
}

export default NavBarTailWind