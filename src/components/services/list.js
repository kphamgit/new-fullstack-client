
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
     let url = `${newrootpath}/api/categories` 
     const response = await axios.get(url)
     return response
  
}

export async function login(credentials) {
   let url = `${newrootpath}/sessions` 
   const response = await axios.post(url, credentials )
   //response is a promise
   return response
}