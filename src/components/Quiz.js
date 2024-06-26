import React from "react";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";


export default function Quiz({quiz_content}) {
    const livequizflag = useSelector(state => state.livequizflag.value)
    const livequizid = useSelector(state => state.livequizid.value)
    const user = useSelector(state => state.user.value)

    
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
   
        return(
            <>
            <div><span style={{color:'brown'}}>Quiz&nbsp;{quiz_content.quiz_number}&nbsp;</span>
            <Link to={`/quiz_attempts/take_quiz/${quiz_content.id}`} >{quiz_content.name}</Link>
            { 
                (user.role === "teacher") && <span style={{color:"green"}}>&nbsp;&nbsp;quiz id: {quiz_content.id}</span>
            }
            </div>
            </>
            )
    
}