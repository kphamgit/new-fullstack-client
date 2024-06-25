import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SocketContext } from './App';
import { addScore } from '../redux/livescores';
import ScoreRow from './ScoreRow';
import { resetScoreBoard } from '../redux/livescores';
import { setQuestion } from '../redux/livequestion';
import {clearScores} from '../redux/livescores'

const chunk = (arr, size) =>
//break arr into chunks of size 'size'
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

 function LiveScoreBoardSave() {
    const livescores = useSelector((state) => state.livescore.value)
    const rootpath = useSelector((state) => state.rootpath.value)
    const user = useSelector((state) => state.user.value)
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [scoresTable, setScoresTable] = useState([])
    
    //useEffect(() => {

    //},[])

    useEffect(() => {
        async function fetchData() {
          // You can await here
            const url = rootpath + `/api/classes/${user.class_id}`
            const response = await axios.get(url)
            //console.log("LiveScoreBoard XXXXXXXXXXXX fetch students data from server")
            dispatch(resetScoreBoard())
            response.data.forEach( (name) => {
                dispatch(addScore({student_name: name, question_number: null, score: null, total_score: null}))
            })
            //convert response.data (list of student names) into a 2-dimentional array for display
            const newArr = [];
            while(response.data.length) newArr.push(response.data.splice(0,3));
            //console.log(newArr);
            setScoresTable(newArr)
        }
        fetchData()
    },[socket, dispatch, rootpath, user.class_id])

    useEffect( () => {
      socket.on('reset_scoreboard', () => {
          dispatch(clearScores())
          dispatch(setQuestion(null))
      })
    },[socket, dispatch])

    //className scoreboard is defined in App.css
  return ( 
        <>
        <div>&nbsp;</div>
        <div className='scoreboard'>
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

export default LiveScoreBoardSave