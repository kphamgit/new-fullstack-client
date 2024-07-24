import React, {useEffect, useState, useRef } from 'react'
import { deleteQuizAttempts, getQuestionAttempts, getQuizAttempts } from '../services/list';
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
 
const getAllQuestionAttempts = () => {
  getQuestionAttempts()
  .then(response => {
    console.log("Total number of question attempts",response.data.length)
  }) 
}
const handleDeleteAll = () => {
  const els = document.getElementsByTagName('tr')
  let quiz_attempt_ids = []
  Array.from(els).forEach(function (element) {
    //console.log("**** "+element.children.length + "*****")
    if(element.tagName === 'TR') {
      if (element.children[0].tagName !== 'TH') {
        //console.log(element.children[0].innerHTML)
        quiz_attempt_ids.push(parseInt(element.children[0].innerHTML))
      }
   }
});
console.log(quiz_attempt_ids)
deleteQuizAttempts(quiz_attempt_ids)
.then((response) => {
  console.log(response)
})
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
                     <tr  key={quiz_attempt.id }>
                          <td >{quiz_attempt.id }</td>
                          <td className='text-blue-600'>{quiz_attempt.user_name }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.completion_status }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.score }&nbsp;&nbsp;</td>
                          <td>{quiz_attempt.createdAt}&nbsp;&nbsp;</td>
                        
                      </tr>
                ))
                }
                </tbody>
            </table>
            <div><Button className='bg-green-800' onClick={() => getAllQuestionAttempts()}>get All Question Attempts</Button></div>
        </div>
    )
}
