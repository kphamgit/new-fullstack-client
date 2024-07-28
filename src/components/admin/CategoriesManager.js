import React from 'react'
import { Link } from 'react-router-dom';

export function CategoriesManager({categories}) {
    /*
    const mounted = useRef(true);
    useEffect(() => {
        mounted.current = true;
        getCategories()
        .then ( response => {
          if(mounted.current) {
            setCategories(response.data);    
            let all_sub_categories = []
            response.data.forEach( category => {
              category.sub_categories.forEach( sub_cat => {
                all_sub_categories.push(sub_cat)
              })
            })
          }
        })
        return () => mounted.current = false;
      //}
    }, []);
*/
    return (
        <div className='bg-gray-300 m-16'>
            <table>
                <tbody>
                { categories.map(cat => (
                    <>
                     <tr key={cat.id }>
                        <td>{cat.category_number} </td>
                        <td>{cat.name} </td>
                     </tr>
                     <tr>
                        <td>
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            { cat.sub_categories.map(sub_cat => 
                                <tbody>
                                    <tr key={sub_cat.id}>
                                        <td>{sub_cat.sub_category_number}</td>
                                        <td>{sub_cat.name} </td>
                                        <td><Link to={`/sub_categories/manage_units/${sub_cat.id}`}>Manage Units</Link></td>
                                    </tr>
                                </tbody>
                            )
                            }
                            </table>
                        </td>
                     </tr>
                     </>
                ))
                }
                </tbody>
            </table>
        </div>
    )
}
