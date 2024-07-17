import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { addScore } from '../redux/livescores';
import ScoreRow from './ScoreRow';
import { resetLiveScores } from '../redux/livescores';
import {getStudentsInClass} from './services/list.js'
//import { setQuestion } from '../redux/livequestion';
//import {clearScores} from '../redux/livescores'

/*
const chunk = (arr, size) =>
//break arr into chunks of size 'size'
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
*/
 function LiveScoreBoard({class_id}) {
  
    const livescores = useSelector((state) => state.livescore.value)
    const dispatch = useDispatch()
 
    useEffect(() => {
      getStudentsInClass(class_id)
      .then((response) => {
        if (response.data) {
          dispatch(resetLiveScores())
          response.data.users.map((student, index) => {
              dispatch(addScore({student_name: student.user_name, question_number: null, score: null, total_score: null}))
          })
        }
        else {
  
        }
      })
      .catch(error => {
          console.log(error)
      });
    },[class_id, dispatch])

  return ( 
        <>
        <div>Live Li ve Scoreboard</div>
        <br />
        <div>
                {livescores.map((score_data, index) => (
                    <div key={index}>
                            <ScoreRow score_data={score_data} index={index} 
                           />  
                    </div>
                ))}
       </div>
     </>
  );
}

export default LiveScoreBoard