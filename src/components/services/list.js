
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
//const url = rootpath + "/api/quiz_attempts/find_create/" + quizId + '/' + user.user_name
export async function findCreateQuizAttempt(quiz_id, user_name) {
  console.log(" ENTRY findCreateQuizAttempt quiz_id ="+quiz_id + " user name="+user_name)
  console.log(" in findCreateQuizAttempt rootpath ="+newrootpath)
  const url = `${newrootpath}/api/quiz_attempts/find_create/${quiz_id}/${user_name}`
  console.log(" in findCreateQuizAttempt url before calling axios ="+url)
  const response = await axios.get(url)
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