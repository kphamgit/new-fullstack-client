import React from 'react';
import { useState, useEffect } from 'react';
import Unit from './Unit';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '../redux/subcategory';
import { fetchSubcatetoryUnits } from './services/list';

export default function Subcategory({subcat_id, name}) {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSubcategory(name))
  })
 
  const [post, setPost] = useState([]);
 
  useEffect(() => {
    fetchSubcatetoryUnits(subcat_id)
    .then (response => {
        response.data.units.sort( (a,b) => { return a.unit_number - b.unit_number; } )
        setPost(response.data)
    })
  },[subcat_id])

  return(
    <div style={{marginTop:"20px", marginLeft:"80px", marginRight:"50px"}}>
     <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"><Link to='/' >Home</Link></div>
     <br />
        <div className="flex flex-col gap-2 bg-indigo-200">
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