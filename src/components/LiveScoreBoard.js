import React from 'react'
import { useSelector } from 'react-redux';
//import { addLiveScore } from '../redux/livescores';
import ScoreRow from './ScoreRow';
//import { resetLiveScores } from '../redux/livescores';
//import { setQuestion } from '../redux/livequestion';
//import {clearScores} from '../redux/livescores'

/*
const chunk = (arr, size) =>
//break arr into chunks of size 'size'
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
*/
 function LiveScoreBoard() {
  
    const livescores = useSelector((state) => state.livescore.value)
    
    /*
    useEffect(() => {
        socket.emit('scoreboard_loaded', {
            user_name: user.user_name
        });
    },[])
    */
   /*
    useEffect(() => {
      socket.on('new_user', arg => {
          //console.log(" new user. User list: ",arg)
          setStudentList(arg)
      })
      
      return () => {
          socket.off("new_user")
      }   
      //eslint-disable-next-line 
  }, [])

  useEffect(() => {
      socket.on('user_disconnected', arg => {
          //console.log(" user disconnected list :",arg)
          setStudentList(arg)
      })
      
      return () => {
          socket.off("user_disconnected")
      }   
      //eslint-disable-next-line 
  }, [])
  */
  /*
    useEffect(() => {
        async function fetchData() {
          // You can await here
            const url = rootpath + `/api/classes/${user.class_id}`
            const response = await axios.get(url)
            console.log("LiveScoreBoard XXXXXXXXXXXX fetch student data response=", response.data)
            dispatch(resetLiveScores())
            response.data.forEach( (name) => {
                dispatch(addLiveScore({student_name: name, question_number: null, score: null, total_score: null}))
            })
            //convert response.data (list of student names) into a 2-dimentional array for display
            //keep this to learn programming
            //const newArr = [];
            //while(response.data.length) newArr.push(response.data.splice(0,3));
            //console.log(newArr);
            //setScoresTable(newArr)
            
        }
        fetchData()
    },[dispatch, rootpath, user.class_id])
    */

  return ( 
        <>
        <div>Live Scoreboard</div>
        <br />
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

export default LiveScoreBoard