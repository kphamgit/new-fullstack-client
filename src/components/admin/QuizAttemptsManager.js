import React, {useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { deleteQuizAttempts, getQuizAttempts } from '../services/list';
import { compose } from '@reduxjs/toolkit';
import { Button } from 'flowbite-react';

export function QuizAttemptsManager({categories}) {
    const [quizAttempts, setQuizAttempts] = useState(null)
    
    const mounted = useRef(true);
    useEffect(() => {
        mounted.current = true;
        getQuizAttempts()
        .then ( response => {
          if(mounted.current) {
            setQuizAttempts(response.data);    
          }
        })
        return () => mounted.current = false;
    }, []);

    /*
td><%= quiz_attempt.user_name %></td>
<td><%= quiz_attempt.completion_status %></td>
<td><%= quiz_attempt.questions_exhausted %></td>
<td><%= quiz_attempt.score %></td>
    */
   const handleDelete = (quiz_attempt_id) => {
       
       deleteQuizAttempts(quiz_attempt_id)
       .then((response) => {
          console.log("EEEEE", response.data)
       })
       .catch((error) =>{
          console.log("ERROR delete quiz attempt id = ", quiz_attempt_id)
       })
   }

   const handleDeleteAll = () => {
       
    
   }

    //<td><Link to={`/manage_category/${cat.id}`}>Manage Category</Link></td>
    return (
        <div className='bg-gray-300 m-12'>
          <div><Button className='bg-red-800' onClick={() => handleDeleteAll()}>Delete All</Button></div>
            <table>
              <thead>
                <tr>
              <th>ID</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Time Started</th>
                  </tr>
              </thead>
                <tbody>
              
                { quizAttempts && quizAttempts.map(quiz_attempt => (
                     <tr key={quiz_attempt.id }>
                          <td>{quiz_attempt.id }&nbsp;&nbsp;</td>
                          <td className='text-blue-600'>{quiz_attempt.user_name }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.completion_status }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.score }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.createdAt}&nbsp;&nbsp;</td>
                          <td><Button className='bg-blue-700' onClick={() => handleDelete(quiz_attempt.id)}>Delete</Button></td>
                      </tr>
                ))
                }
                </tbody>
            </table>
            
        </div>
    )
}
