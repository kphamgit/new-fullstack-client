
import axios from "axios";

let rootpath = null
if (process.env.NODE_ENV === "development") {
  rootpath = 'http://localhost:5001'
}
else if (process.env.NODE_ENV === "production") {
  rootpath = 'https://fullstack-kp-f6a689f4a15c.herokuapp.com'
}
else {
console.log("invalid NODE_ENV ")
}

export async function getAGame(id) {
  const url = `${rootpath}/api/matching_games/${id}` 
  const response = await axios.get(url)
  return response

}

export async function getCategories() {
     const url = `${rootpath}/api/categories` 
     const response = await axios.get(url)
     return response
  
}

export async function getUnitWithQuizzes(id) {
  const url = `${rootpath}/api/units/${id}` 
  const response = await axios.get(url)
  return response

}

export async function getQuizWithQuestions(id) {
  const url = `${rootpath}/api/quizzes/${id}` 
  const response = await axios.get(url)
  return response

}

export async function getQuestionAttempts() {
  const url = `${rootpath}/api/question_attempts/find_all` 
  const response = await axios.get(url)
  return response
}

export async function getQuizAttempts() {
  const url = `${rootpath}/api/quiz_attempts` 
  const response = await axios.get(url)
  return response
}

export async function deleteQuizAttempts(quiz_attempt_ids) {
  const url = `${rootpath}/api/quiz_attempts` 
  const response = await axios.delete(url, {params: { ids : JSON.stringify(quiz_attempt_ids)}} )
  return response
}


export async function fetchSubcatetoryUnits(subcat_id) {
  const url = `${rootpath}/api/sub_categories/${subcat_id}`
  const response = await axios.get(url)
  return response
}

export async function getIds() {
  //get ALL game ids, sub_category ids, unit ids, quizzes id
  const url = `${rootpath}/api/utils/get_ids` 
  const response = await axios.get(url)
  return response
}

export async function getGames() {
  const url = `${rootpath}/api/matching_games` 
  const response = await axios.get(url)
  return response
}

export async function getStudentsInClass(class_id) {
  const url = `${rootpath}/api/classes/${class_id}` 
  const response = await axios.get(url)
  return response
}
///api/questions/:id',
export async function findCreateQuizAttempt(quiz_id, user_id) {
  const url = `${rootpath}/api/quiz_attempts/find_create_new/${quiz_id}/${user_id}`
  console.log("in services list.js findCreateQuizAttempt url = ", url)
  const response = await axios.get(url)
  return response
}

export async function getNextQuestion(quiz_id, question_number) {
  const url = `${rootpath}/api/quizzes/${quiz_id}/get_question/${question_number}`
  const response = await axios.get(url)
  return response
}

export async function getAQuestion(id) {
  const url = `${rootpath}/api/questions/${id}`
  const response = await axios.get(url)
  return response
}

export async function cloneQuestion(id) {
  const url = `${rootpath}/api/questions/clone/${id}`
  const response = await axios.get(url)
  return response
}


export async function updateQuestion(id, params) {
  const url = `${rootpath}/api/questions/${id}`
  const response = await axios.put(url, params)
  return response
}

export async function createQuestion(params) {
  console.log("create question params = ",params)
  const url = `${rootpath}/api/questions`
  const response = await axios.post(url, params)
  return response
}

export async function deleteQuestion(id) {
  const url = `${rootpath}/api/questions/${id}`
  const response = await axios.delete(url)
  return response
}

//   var url = rootpath + '/api/quiz_attempts/' + quiz_attempt_id + '/creat_next_question_attempt/' + next_question_number
export async function createQuestionAttempt(quiz_attempt_id, question_number) {
  const url = `${rootpath}/api/quiz_attempts/${quiz_attempt_id}/creat_next_question_attempt/${question_number}`
  const response = await axios.get(url)
  return response
}

export async function processQuestionAttempt(question_attempt_id, user_answer) {
  const url = `${rootpath}/api/question_attempts/${question_attempt_id}/process_attempt`
  const response = await axios.post(url,{user_answer: user_answer})
  return response
}

export async function processLiveQuestionAttempt(question_id, user_answer) {
  const url = `${rootpath}/api/question_attempts/process_live_attempt/${question_id}/`
  const response = await axios.post(url,{user_answer: user_answer})
  return response
}

export async function reOrderRows(item_type, item_ids) {
  //item_type can be : "questions", "quizzes", "subcategories", "categories", "units"
  //item_ids  =    {"1":"159","2":"160","3":"157"}
  const url = `${rootpath}/api/${item_type}/paginate`
  const response = await axios.post(url,{item_ids: JSON.stringify(item_ids)})
  return response
}

/*
      type: "POST",
                            url: "/api/questions/paginate",
                            data: { question_ids: JSON.stringify(all_question_ids) },
                            success: function(data) { console.log("Success!"); 
                                var children = $("#questions").find(".td-question_num");
                                $.each( children, function( index, value ){
                                        $(this).text((index+1).toString());
                                        //console.log(index.toString());
                                });
                            },    
*/

export async function login(credentials) {
   if (credentials.username.length === 0) {
      alert("Please enter username")
      return false
   }
   else if (credentials.password.length === 0) {
      alert("please enter password")
      return false
  }
   let url = `${rootpath}/sessions` 
   const response = await axios.post(url, credentials )
   //response is a promise
   return response.data
}