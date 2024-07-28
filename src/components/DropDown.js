import React from 'react'
import { Navbar, Dropdown } from "flowbite-react";
import { Link, Outlet } from 'react-router-dom';
//import { Link, Outlet } from 'react-router-dom';
export function DropDown({label, itemList}) {
 
    return (
        
        <Dropdown
          arrowIcon={true}
          inline
          label={label}
        >
        {itemList.map(item => 
        <Dropdown.Item key={item.id}>
          {item.name}
        </Dropdown.Item>
    )}
        </Dropdown>
        
    )
}
