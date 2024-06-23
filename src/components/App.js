import React, {useState, useRef, useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";
import {setRootPath} from '../redux/rootpath';
import Login from './auth/Login'
import Logout from './auth/Logout';
import Home from './Home';
import NavBarComponent from './NavBarComponent';
import Subcategory from './Subcategory';
import QuizAttempt from './QuizAttempt';
//import axios from 'axios';
import {newGetCategories } from './services/list'


//const token = getToken();
function setAuth(userToken) {
  //console.log(JSON.stringify({ x: 5, y: 6 }));
  //console.log("in setTToken JSON.stringy userToken ="+JSON.stringify(userToken))
  //console.log("MMMMM", userToken)
  //console.log("MMMMSSSSSM", JSON.stringify(userToken))
  sessionStorage.setItem('auth', JSON.stringify(userToken));
}

function getAuth() {
  const tokenString = sessionStorage.getItem('auth');
  //console.log(" in getAuth tokenString from session Storage ="+tokenString)
  const userToken = JSON.parse(tokenString);
  //console.log("in getAuth userTOken after parsing", userToken)
  return userToken?.auth
  //return userToken
}

function App() {

  const userAuth = useRef(null)
  //const token = useSelector((state) => state.token.value)
  const [token, setToken] = useState()
  const subcategory = useSelector((state) => state.subcategory.value)
  
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const user = useSelector((state) => state.user.value)
  const [games, setGames] = useState(null)
  const mounted = useRef(true);

  const dispatch = useDispatch()

  const auth = getAuth();
  //console.log("after calling getTToken ttoken=", auth)


  useEffect(() => {
      mounted.current = true;
      if (!auth) return
      
      newGetCategories()
      .then ( response => {
        if(mounted.current) {
          setCategories(response.data);    
          let all_sub_categories = []
          response.data.forEach( category => {
            category.sub_categories.forEach( sub_cat => {
              all_sub_categories.push(sub_cat)
            })
          })
          setSubcategories(all_sub_categories)
        }
      })
      return () => mounted.current = false;
    //}
  }, [auth]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
        dispatch(setRootPath('http://localhost:5001'))
    }
    else if (process.env.NODE_ENV === "production") {
        dispatch(setRootPath('https://fullstack-kp-f6a689f4a15c.herokuapp.com'))
    }
    else {
      console.log("invalid NODE_ENV ")
    }
  }, [dispatch])

  if(!auth) { 
    return <Login setToken={setToken} setAuth={setAuth} />
  }
  return (
    <>
          <BrowserRouter>
            <NavBarComponent categories={categories} />
            <Routes>
              <Route path="/" element = {<Home />} />
              <Route path="/logout" element = {<Logout setToken={setToken} setAuth = {setAuth} />} />
             { subcategories.map(subcat => (
                <Route key={subcat.id} path={`/sub_categories/${subcat.id}/*`} element={<Subcategory id = {subcat.id} name={subcat.name}/>} />
              ))
             }
               <Route path="/quiz_attempts/take_quiz/:quiz_id" element = {<QuizAttempt username={user.username} />} />
            </Routes>
            </BrowserRouter>
        </>
  );
}

export default App;
