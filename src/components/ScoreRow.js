import React, { useContext, useEffect } from 'react';
import { SocketContext } from './App.js';
import { useDispatch } from 'react-redux';
import { setQuestionNumber, setScores } from '../redux/livescores';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import axios from 'axios';
import { setShowLiveQuestion } from '../redux/showlivequestion';
import { setQuestion } from '../redux/livequestion';

function ScoreRow({score_data }) {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    const rootpath = useSelector((state) => state.rootpath.value)

    /*
    useEffect(() => {
        socket.on('next_live_question', (arg, callback) => {
           // if (showlivequestion) {
            const it_s_me = () => user.user_name === score_data.student_name
            if (it_s_me() ) {
                callback({status: "OK", user_name: user.user_name, livequestionnumber: arg.live_question_number});
                //const {source, ...restOfArg} = arg              
                var url = rootpath + '/api/quizzes/' + arg.quiz_id + '/get_question/' + arg.quiz_question_number
                axios.get(url).then((response) => {
                    if (response.data.end_of_quiz) {
                            console.log("END OF QUIZ")
                    }
                    else {
                        //update live question number in livescores araay in redux store
                        dispatch(setQuestionNumber({student_name: user.user_name, question_number: arg.live_question_number}))
                        dispatch(setShowLiveQuestion(true))
                        dispatch(setQuestion({...response.data.question, 
                            question_number: arg.live_question_number, timeout_length: arg.timeout_length
                        }))
                    }
                });
            }
           // }
        })
        return () => {
            //event registration cleanup (happens upon component dismount)
            //i.e, user goes to another link/route/page
            socket.off("next_live_question")
        }  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket, user.user_name, dispatch]) 
*/
    useEffect(() => {
        socket.on('live_score', arg => {
            //console.log("OOOOOOOOOOOOOO ScoreRow live score receive arg",arg)
            const it_s_me = () => user.user_name === score_data.student_name
            if(it_s_me() ) {
                //console.log("IT S ME")
                //console.log("user match ScoreRow live score receive arg",arg)
               // console.log("NewScoreRow live_score for ", score_data.student_name)
                dispatch(setScores({student_name: arg.user, score: arg.score, total_score: arg.total_score}))
            }
        })
        
        return () => {
            socket.off("live_score")
        }   
        //eslint-disable-next-line 
    }, [socket, dispatch, score_data.student_name])

    useEffect(() => {
         //get max score(s)
         const total_score_eles = document.getElementsByClassName('total_score')
         let total_scores_array = []
         for(let j = 0; j < total_score_eles.length; j++){
             const total_score = total_score_eles[j].innerHTML === '' ? 0
                 : parseInt(total_score_eles[j].innerHTML)
             total_scores_array.push(total_score)
         }
         
         var highest = Math.max(...total_scores_array);
         for(let j = 0; j < total_score_eles.length; j++) {
             if (parseInt(total_score_eles[j].innerHTML ) === highest ) {
                total_score_eles[j].style.color = 'red'
             }
             else {
                 total_score_eles[j].style.color = 'black'
            }
         }
         
    },[score_data.total_score])

    useEffect(() => {
        socket.on('live_question_acknowledged', (arg) => {
            //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
            //console.log("I am a ScoreRow. My student name is: "+score_data.student_name)
            //console.log(` I am ${it_s_me() === true ? ' ' : "NOT"} the current logged in user`)
            //console.log("I just received a live question acknowledgement from this user: ",arg.user_name)
            
            //console.log("acknowledgement received score data",score_data)
            if(arg.user_name === score_data.student_name) {
                const it_s_me = () => user.user_name === score_data.student_name
                //console.log("This live question acknowledgement was sent from a user with my student name") 
                if (!it_s_me()) {
                  // console.log(" I am not the current logged in user")
                   //console.log(" So i will update the question number for me in redux store")
                   //console.log(" acknowledgement arg=",arg)
                   //only update question number if ScoreRow student is not the current logged in user
                   dispatch(setQuestionNumber({student_name: arg.user_name, question_number: arg.livequestionnumber}))
                }
                //else: Since I am the current logged in owner, I already have my question_number, 
                // so I don't need to update my question number in Redux store
            }
        })
        return () => {
            socket.off("live_question_acknowledged")
        }   
        //eslint-disable-next-line
    },[socket, dispatch, score_data.student_name])

    useEffect(() => {
        socket.on('question_attempt_started', (arg) => {
            //console.log("I am a ScoreRow. My student name is: "+score_data.student_name)
            console.log("I just received a question_attempt_started message from user: "+arg.user_name)
        })
        return () => {
            socket.off("question_attempt_started")
        }   
    },[socket])
//

  return (
    <>
        <span style={{color:"blue"}}>&nbsp;{score_data.student_name}</span>
        <span style={{color:"green"}}>&nbsp;&nbsp;{score_data.question_number}</span>
        <span style={{color:"blue"}}>&nbsp;&nbsp;{score_data.score}</span>
        <span>&nbsp;&nbsp;</span>
        <span className='total_score' style={{color:"green"}}>{score_data.total_score}</span>
    </>
  )
}

export default ScoreRow