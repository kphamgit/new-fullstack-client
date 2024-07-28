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
        <div className="text-amber-700 text-lg">
          <span>Unit&nbsp;{unit.unit_number}.&nbsp;&nbsp;{unit.name}</span>
          <span>&nbsp;&nbsp;
          <Link to={`/units/manage_quizzes/${unit.id}`}
                  className="font-serif text-normal text-blue-800 dark:text-blue-500 hover:underline"
                  >
                  Manage quizzes</Link>
          </span>
        </div>
        <div>

        <table >
            <thead>
                <tr className="text-cyan-700 text-sm">
                   <th className="text-left">ID</th>
                   <th className="text-left">Quiz Number</th>
                   <th className="text-left">Quiz Name</th>
                </tr>
              </thead>
            <tbody>
                 {unit.quizzes.map((quiz) =>  
              (<tr key = {quiz.id}>
                <td>{quiz.id}</td>
                <td className="text-center">{quiz.quiz_number}</td>
                <td>{quiz.name}</td>
                <td><button className='underline text-red-800' onClick={ (quiz_id) => toQuestionsManager(quiz.id)} >
                  Manage Questions
                </button>
                </td>
              </tr> 
              )
          )}
            </tbody>
  </table>
        </div>
        </>
        )
  }
  
/*
  <table >
            <thead>
                <tr>
                   <th>ID</th>
                   <th>Quiz Number</th>
                   <th>Quiz Name</th>
                </tr>
              </thead>
            <tbody>
                 {unit.quizzes.map((quiz) =>  
              (<tr key = {quiz.id}>
                <td>{quiz.id}</td>
                <td>{quiz.quiz_number}</td>
                <td>Name: {quiz.name}</td>
                <td><button className='underline text-red-800' onClick={ (quiz_id) => toQuestionsManager(quiz.id)} >
                  Manage Questions
                </button>
                </td>
              </tr> 
              )
          )}
            </tbody>
  </table>
*/