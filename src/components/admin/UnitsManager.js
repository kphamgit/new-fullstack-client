import React, { useEffect, useState } from 'react'
import { fetchSubcatetoryUnits } from '../services/list'
//import { QuizzesManager } from './QuizzesManager'
import { Link } from 'react-router-dom'

export function UnitsManager({subcat_id}) {
    const [units, setUnits] = useState(null)
    const [subCatName, setSubCatName] = useState(null)
    
    useEffect(() => {
        fetchSubcatetoryUnits(subcat_id)
        .then( response => {
            //console.log("VVVVV",response.data)
            setUnits(response.data.units)
            setSubCatName(response.data.name)
        })
    },[subcat_id])

    return (
        <div className='m-12'>
            <div className='text-red-600 text-xl mb-3'>{subCatName}</div>
            <ul>
            { units && 
                units.map(unit =>
                    <>
                    <li key={unit.id}>Unit id: {unit.id} Name: {unit.name}</li>
                    <li><Link to={`/units/manage_quizzes/${unit.id}`}>Manage Quizzes</Link></li>
                    <li><br /></li>
                    </>
                )
            }
            </ul>
            <div>NEW UNIT</div>
     
        </div>
    )
}
