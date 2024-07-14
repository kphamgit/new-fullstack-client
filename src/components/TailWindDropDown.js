import React from 'react'
import { Navbar, Dropdown } from "flowbite-react";
import { Link, Outlet } from 'react-router-dom';
//import { Link, Outlet } from 'react-router-dom';
export function TailWindDropDown({category_name, sub_categories}) {
 
    return (
        
        <Dropdown
          arrowIcon={true}
          inline
          label={category_name}
        >
        {sub_categories.map(subcat => 
        <Dropdown.Item  as={Link} to={`/sub_categories/${subcat.id}`}  key={subcat.id}>
          {subcat.name}
        </Dropdown.Item>
    )}
        </Dropdown>
        
    )
}
