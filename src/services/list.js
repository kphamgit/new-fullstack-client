
import axios from "axios";

let newrootpath = null
if (process.env.NODE_ENV === "development") {
  newrootpath = 'http://localhost:5000'
}
else if (process.env.NODE_ENV === "production") {
  newrootpath = 'https://fullstack-kp-f6a689f4a15c.herokuapp.com'
}
else {
console.log("invalid NODE_ENV ")
}

export async function newGetCategories() {
    //console.log(process.env.NODE_ENV)
    //console.log("here in getCategories")
     //let url = `${rootpath}/api/categories`
     let url = `${newrootpath}/api/categories` 
     
     const response = await axios.get(url)
     
     return response
  
}