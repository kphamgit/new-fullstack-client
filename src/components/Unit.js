import React from "react";
import Quiz from "./Quiz";
//import { Link } from "react-router-dom";
//import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";


export default function Unit(props) {
   /*
 if (livequizflag) {
        if (quiz_content.id === parseInt(livequizid) ) {
        return(
        <>
        <div><span style={{color:'brown'}}>Quiz&nbsp;{quiz_content.quiz_number}&nbsp;</span>
        <Link to={`/quiz_attempts/take_quiz/${quiz_content.id}`} >{quiz_content.name}</Link>
        </div>
        </>
        )
        }
        else {
            return(
                <>
                <div><span style={{color:'brown'}}>Quiz&nbsp;{quiz_content.quiz_number}&nbsp;</span>
                <span style={{color:"green"}}>{quiz_content.name}</span>
                </div>
                </>
                )
        }
    }
   
   */
  const livequizflag = useSelector(state => state.livequizflag.value)
  const livequizid = useSelector(state => state.livequizid.value)

  if (livequizflag) {
        return (
          <>
        <div>LIVE</div>
        <div>{livequizid}</div>
        
        <div>Unit{props.content.unit_number}.&nbsp;&nbsp;{props.content.name}</div>
        <div>
        {props.content.quizzes && <ul>
        {props.content.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                Quiz {quiz.quiz_number} &nbsp;
                { quiz.id === parseInt(livequizid) ?
                <a href={`/quiz_attempts/take_quiz/${quiz.id}`}
                  className="font-serif text-green-800 dark:text-blue-500 hover:underline"
                  >
                  {quiz.name}</a>
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
        <div>NOT LIVE</div>
        <div>Unit{props.content.unit_number}.&nbsp;&nbsp;{props.content.name}</div>
        <div>
        {props.content.quizzes && <ul>
        {props.content.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                Quiz {quiz.quiz_number} &nbsp;
  
                <a href={`/quiz_attempts/take_quiz/${quiz.id}`}
                  className="font-normal text-green-800 dark:text-blue-500 hover:underline"
                  >
                  {quiz.name}</a>
              </li> 
              )
          )}
      </ul>}
        
        </div>
        </>
    )
    }
  }
  