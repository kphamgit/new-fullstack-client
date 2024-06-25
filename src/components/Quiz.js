import React from "react";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";


export default function Quiz({quiz_content}) {
    const livequizflag = useSelector(state => state.livequizflag.value)
    const livequizid = useSelector(state => state.livequizid.value)
    console.log("live quiz id ="+livequizid)
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
                <span>{quiz_content.name}</span>
                </div>
                </>
                )
        }
    }
   
        return(
            <>
            <div><span style={{color:'brown'}}>Quiz&nbsp;{quiz_content.quiz_number}&nbsp;</span>
            <Link to={`/quiz_attempts/take_quiz/${quiz_content.id}`} >{quiz_content.name}</Link>
            </div>
            </>
            )
    
}