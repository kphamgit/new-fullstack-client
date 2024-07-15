import React from "react";
import { Link } from "react-router-dom";
//import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";


export default function Unit(props) {
  
  const livequizflag = useSelector(state => state.livequizflag.value)
  const livequizid = useSelector(state => state.livequizid.value)

  if (livequizflag) {
        return (
          <>
        <div>Unit{props.content.unit_number}.&nbsp;&nbsp;{props.content.name}</div>
        <div>
        {props.content.quizzes && <ul>
        {props.content.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                Quiz {quiz.quiz_number} &nbsp;
                { quiz.id === parseInt(livequizid) ?
                <Link to={`/quiz_attempts/take_quiz/${quiz.id}`}
                  className="font-serif text-normal text-green-800 dark:text-blue-500 hover:underline"
                  >
                  {quiz.name}</Link>
                  :
                  <span style={{color:"brown"}}>{quiz.name}</span>
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
        
        <div>Unit{props.content.unit_number}.&nbsp;&nbsp;{props.content.name}</div>
        <div>
        {props.content.quizzes && <ul>
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
      </ul>}
        
        </div>
        </>
    )
    }
  }
  