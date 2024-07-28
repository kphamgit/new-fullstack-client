import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchSubcatetoryUnits } from './services/list';
import { useSelector } from 'react-redux';
import UnitTeacher from './UnitTeacher';
import UnitStudent from './UnitStudent';

export default function Subcategory({subcat_id}) {
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const user = useSelector(state => state.user.value)
 
  const [units, setUnits] = useState([]);
  const [subCatName, setSubcatName] = useState('')
 
  useEffect(() => {
    fetchSubcatetoryUnits(subcat_id)
    .then (response => {
        response.data.units.sort( (a,b) => { return a.unit_number - b.unit_number; } )
        setUnits(response.data.units)
        setSubcatName(response.data.name)
    })
  },[subcat_id, dispatch])

 

  return(
     <div className='m-14'>
     <div className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
         <Link to='/' >Home</Link>
      </div>
     <div className='text-lg text-green-700'>{subCatName}</div>
        <div className="flex flex-col gap-1 bg-indigo-200">
        {units && 
              <>
                {units.map((unit) =>  
                (<span className='mx-4 my-2' key = {unit.id}>
                  {(user.role === 'teacher') ?
                    <UnitTeacher unit={unit} />
                    :
                    <UnitStudent unit={unit}/>
                  }
                </span> 
                )
                )}
              </>}
        </div>
      </div>
  );
}