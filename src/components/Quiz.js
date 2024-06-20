import React from "react";
import {Link} from 'react-router-dom'


export default function Quiz(props) {
    return(
        <>
        <div><span style={{color:'brown'}}>Quiz&nbsp;{props.quiz_content.quiz_number}&nbsp;</span>
        <Link to={`/quiz_attempts/take_quiz/${props.quiz_content.id}`} >{props.quiz_content.name}</Link>
        </div>
        </>
    )
}