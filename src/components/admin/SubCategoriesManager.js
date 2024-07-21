import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
//import { fetchSubcatetoryUnits } from '../services/list'

export function SubCategoriesManager({subCategories, cat_id, name}) {
     const [mySubCategories, setMySubcategories] = useState([])
    /*
    useEffect(() => {
        const mysubcategories = subCategories.filter((subcat) => subcat.categoryID !== cat_id)
        setMySubcategories(mysubcategories)
      },[])
    */
   
    return (
        <div>
            <h3>{cat_id} </h3>
    </div>
    )
}

/*
 { subCategories.map(subcat => (
            <tr key={subcat.id }>
                <td>{subcat.id} </td> 
                <td>{subcat.category_number} </td>
                <td>{subcat.name} </td>
                <td><Link to='/manage_sub_categories'>Manage Units</Link></td>
             </tr>
        ))
        }
*/