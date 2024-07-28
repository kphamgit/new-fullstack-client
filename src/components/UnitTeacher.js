import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function UnitTeacher({unit}) {
  
  const livequizflag = useSelector(state => state.livequizflag.value)
  const livequizid = useSelector(state => state.livequizid.value)
  const user = useSelector(state => state.user.value)
  const navigate = useNavigate()

  //http://localhost:3000/quizzes/manage_questions/125
  const toQuestionsManager = (quiz_id) => {
    navigate(`/quizzes/manage_questions/${quiz_id}`, { 
      state: { subcat_id: unit.subCategoryId},
      replace: false,
  })
  } 
  
        return (
          <>
          <div>Teacher</div>
          <Link to={`/units/manage_quizzes/${unit.id}`}
                  className="font-serif text-normal text-blue-800 dark:text-blue-500 hover:underline"
                  >
                  Manage quizzes</Link>
        <div className="text-amber-700 text-lg">Unit{unit.unit_number}.&nbsp;&nbsp;{unit.name}</div>
        <div>
        {unit.quizzes && 
        <ul>
        {unit.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                <span>{quiz.id}</span>
                Quiz number: {quiz.quiz_number} &nbsp;
                <span>Name: {quiz.name}</span>
                <button className='underline text-red-800' onClick={ (quiz_id) => toQuestionsManager(quiz.id)} >Manage Questions</button>
              </li> 
              )
          )}
      </ul>}
        
        </div>
        </>
        )
  }
  
  //http://localhost:3000/units/manage_quizzes/16