import React, {useEffect, useRef, useState} from 'react'
import ScoreRow from './ScoreRow';
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
  
    const [students, setStudents] = useState([])
    const mounted = useRef(true);
    useEffect(() => {
      mounted.current = true;
      getStudentsInClass(class_id)
      .then((response) => {
        if(mounted.current) {
          setStudents(response.data.users)
        }
      })
      .catch(error => {
          console.log(error)
      });
      return () => mounted.current = false;
    },[class_id])

  return ( 
        <>
       
    
        <div className='mx-2 my-3 gap-1 flex flex-col'>
              <div>Scoreboard</div>
               { students.map((student, index) => (
                    <div key={index}>
                        <ScoreRow student_name = {student.user_name} />
                    </div>
                ))}
       </div>
     </>
  );
}

export default LiveScoreBoard