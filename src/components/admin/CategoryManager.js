import React, {useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { getCategoryWithSubCategories } from '../services/list';

export function CategoryManager({id}) {
    const [results, setResults] = useState(null)
    
    const mounted = useRef(true);
    useEffect(() => {
        mounted.current = true;
        getCategoryWithSubCategories(id)
        .then ( response => {
          if(mounted.current) {
            console.log(response.data)
            if (results) {
              setResults(response.data);  
            } 
            //setSubcategories(all_sub_categories)
          }
        })
        return () => mounted.current = false;
      //}
    },[id]);

    return (
        <div className='bg-gray-300'>
              {results.sub_categories.map((sub_cat) =>  
              (<li key = {sub_cat.id}>
                SubCat {sub_cat.name} &nbsp;
              </li> 
              )
          )}
        </div>
    )
}

/*

     {results.sub_categories.map((sub_cat) =>  
              (<li key = {sub_cat.id}>
                SubCat {sub_cat.name} &nbsp;
              </li> 
              )
          )}
   {props.content.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                Quiz {quiz.quiz_number} &nbsp;
  
                <Link to={`/quiz_attempts/take_quiz/${quiz.id}`}
                  className="font-normal text-green-800 dark:text-blue-500 hover:underline"
                  >
                  {quiz.name}</Link>
              </li> 
              )
          )}
*/