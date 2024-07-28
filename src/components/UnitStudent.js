import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function UnitStudent({unit}) {
  
  const livequizflag = useSelector(state => state.livequizflag.value)
  const livequizid = useSelector(state => state.livequizid.value)
  const user = useSelector(state => state.user.value)

  if (livequizflag) {
        return (
          <>
        <div className="text-amber-700 text-lg">Unit{unit.unit_number}.&nbsp;&nbsp;{unit.name}</div>
        <div>
        {unit.quizzes && 
        <ul>
        {unit.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                Quiz {quiz.quiz_number} &nbsp;
                { quiz.id === parseInt(livequizid) ?
                <Link to={`/quiz_attempts/take_live_quiz/${quiz.id}`}
                  className="font-serif text-normal text-blue-800 dark:text-blue-500 hover:underline"
                  >
                  {quiz.name}</Link>
                  :
                  <span className="text-gray-400">{quiz.name}</span>
                }
              </li> 
              )
          )}
      </ul>}
        
        </div>
        </>
        )
  }
    else {
      return(
        <>
        <div className="text-amber-700 text-lg">Unit{unit.unit_number}.&nbsp;&nbsp;{unit.name}
        { user.role === 'teacher' && 
          <span>
             <Link to={`/units/manage_quizzes/${unit.id}`}>Manage Quizzes</Link>
          </span>
        }
        </div>
        <div>
        {unit.quizzes && <ul>
        {unit.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                Quiz {quiz.quiz_number} &nbsp;
  
                <Link to={`/quiz_attempts/take_quiz/${quiz.id}`}
                  className="font-normal text-green-800 dark:text-blue-500 hover:underline"
                  >
                  {quiz.name}</Link>
                  { (user.role === 'teacher') &&
                    <span style={{color:"red"}}>&nbsp;&nbsp;&nbsp; {quiz.id}</span>
                  }
              </li> 
              )
          )}
      </ul>}
        
        </div>
        </>
    )
    }
  }
  
  //http://localhost:3000/units/manage_quizzes/16