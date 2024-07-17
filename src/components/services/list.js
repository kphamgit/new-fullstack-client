
import axios from "axios";

let newrootpath = null
if (process.env.NODE_ENV === "development") {
  newrootpath = 'http://localhost:5001'
}
else if (process.env.NODE_ENV === "production") {
  newrootpath = 'https://fullstack-kp-f6a689f4a15c.herokuapp.com'
}
else {
console.log("invalid NODE_ENV ")
}

export async function newGetCategories() {
     const url = `${newrootpath}/api/categories` 
     const response = await axios.get(url)
     return response
  
}
//const url = `${rootpath}/api/sub_categories/${subcat_id}`
//fetchSubcatetoryUnits
export async function fetchSubcatetoryUnits(subcat_id) {
  const url = `${newrootpath}/api/sub_categories/${subcat_id}`
  const response = await axios.get(url)
  return response
}

//var url = rootpath + '/api/matching_games/' + gameId + '/play_fullstack'
export async function startGame(game_id) {
  const url = `${newrootpath}/api/matching_games/${game_id}/play_fullstack` 
  const response = await axios.get(url)
  let left_array = response.data.base.split('/').map((str, index) => {
    return (
        {src: str, matched: false, match_index: index, language: response.data.source_language}
    )
  });
  let right_array = response.data.target.split('/').map((str, index) => {
    return (
      {src: str, matched: false, match_index: index, language: response.data.target_language }
    )
  });
  return [left_array, right_array]
}


export async function getGames() {
  const url = `${newrootpath}/api/matching_games` 
  const response = await axios.get(url)
  return response
}

export async function getQuizzes() {
  const url = `${newrootpath}/api/quizzes` 
  const response = await axios.get(url)
  return response
}
export async function getStudentsInClass(class_id) {
  const url = `${newrootpath}/api/classes/${class_id}` 
  const response = await axios.get(url)
  return response
}

export async function findCreateQuizAttempt(quiz_id, user_id) {
  const url = `${newrootpath}/api/quiz_attempts/find_create_new/${quiz_id}/${user_id}`
  const response = await axios.get(url)
  return response
}

export async function getNextQuestion(quiz_id, question_number) {
  const url = `${newrootpath}/api/quizzes/${quiz_id}/get_question/${question_number}`
  const response = await axios.get(url)
  return response
}
//   var url = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/creat_next_question_attempt/' + next_question_number
export async function createQuestionAttempt(quiz_attempt_id, question_number) {
  const url = `${newrootpath}/api/quiz_attempts/${quiz_attempt_id}/creat_next_question_attempt/${question_number}`
  const response = await axios.get(url)
  return response
}



export async function processQuestionAttempt(question_attempt_id, user_answer) {
  const url = `${newrootpath}/api/question_attempts/${question_attempt_id}/process_attempt`
  const response = await axios.post(url,{user_answer: user_answer})
  return response
}

export async function processLiveQuestionAttempt(question_id, user_answer) {
  const url = `${newrootpath}/api/question_attempts/process_live_attempt/${question_id}/`
  const response = await axios.post(url,{user_answer: user_answer})
  return response
}

export async function login(credentials) {
   if (credentials.username.length === 0) {
      alert("Please enter username")
      return false
   }
   else if (credentials.password.length === 0) {
      alert("please enter password")
      return false
  }
   let url = `${newrootpath}/sessions` 
   const response = await axios.post(url, credentials )
   //response is a promise
   return response.data
}