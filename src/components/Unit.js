import React from "react";
import Quiz from "./Quiz";
import { ListGroup } from "react-bootstrap";

export default function Unit(props) {

   
    return(
      <>
      <strong>Unit {props.content.unit_number}.&nbsp;&nbsp;{props.content.name}</strong>
      {props.content.quizzes && <ListGroup>
      {props.content.quizzes.map((quiz) =>  
            (<ListGroup.Item key = {quiz.id}>
              <Quiz quiz_content={quiz}/>
            </ListGroup.Item> 
            )
        )}
    </ListGroup>}
      
      </>
  )
}