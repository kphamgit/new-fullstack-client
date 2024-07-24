
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

export async function getAGame(id) {
  const url = `${newrootpath}/api/matching_games/${id}` 
  const response = await axios.get(url)
  return response

}

export async function getCategories() {
     const url = `${newrootpath}/api/categories` 
     const response = await axios.get(url)
     return response
  
}

export async function getUnitWithQuizzes(id) {
  const url = `${newrootpath}/api/units/${id}` 
  const response = await axios.get(url)
  return response

}

export async function getQuizWithQuestions(id) {
  const url = `${newrootpath}/api/quizzes/${id}` 
  const response = await axios.get(url)
  return response

}

export async function getQuestionAttempts() {
  const url = `${newrootpath}/api/question_attempts/find_all` 
  const response = await axios.get(url)
  return response
}

export async function getQuizAttempts() {
  const url = `${newrootpath}/api/quiz_attempts` 
  const response = await axios.get(url)
  return response
}

export async function deleteQuizAttempts(quiz_attempt_ids) {
  const url = `${newrootpath}/api/quiz_attempts` 
  const response = await axios.delete(url, {params: { ids : JSON.stringify(quiz_attempt_ids)}} )
  return response
}


export async function fetchSubcatetoryUnits(subcat_id) {
  const url = `${newrootpath}/api/sub_categories/${subcat_id}`
  const response = await axios.get(url)
  return response
}

export async function getIds() {
  //get ALL game ids, sub_category ids, unit ids, quizzes id
  const url = `${newrootpath}/api/utils/get_ids` 
  const response = await axios.get(url)
  return response
}

export async function getGames() {
  const url = `${newrootpath}/api/matching_games` 
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