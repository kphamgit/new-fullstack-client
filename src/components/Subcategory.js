import React from 'react';
import { useState, useEffect } from 'react';
import Unit from './Unit';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '../redux/subcategory';
import { fetchSubcatetoryUnits } from './services/list';

export default function Subcategory({subcat_id}) {
  
  const dispatch = useDispatch()
 
  const [units, setUnits] = useState([]);
 
  useEffect(() => {
    fetchSubcatetoryUnits(subcat_id)
    .then (response => {
        response.data.units.sort( (a,b) => { return a.unit_number - b.unit_number; } )
        setUnits(response.data.units)
        dispatch(setSubcategory(response.data.name))
    })
  },[subcat_id, dispatch])

  return(
    <div style={{marginTop:"20px", marginLeft:"80px", marginRight:"50px"}}>
     <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"><Link to='/' >Home</Link></div>
     <br />
        <div className="flex flex-col gap-1 bg-indigo-200">
        {units && 
              <>
                {units.map((unit) =>  
                (<span className='mx-4 my-2' key = {unit.id}>
                  <Unit content={unit}/>
                </span> 
                )
                )}
              </>}
        </div>
      </div>
  );
}