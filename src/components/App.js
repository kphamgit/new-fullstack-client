import React, {useState, useRef, useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";
import {setRootPath} from '../redux/rootpath';
import Login from './auth/Login'
import Logout from './auth/Logout';
import Home from './Home';
import NavBarComponent from './NavBarComponent';
import Subcategory from './Subcategory';
//import axios from 'axios';
import {newGetCategories } from '../services/list'


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
  //const rootpath = useSelector((state) => state.rootpath.value)
  const [games, setGames] = useState(null)
  const mounted = useRef(true);

  const dispatch = useDispatch()

  const auth = getAuth();
  console.log("after calling getTToken ttoken=", auth)


  useEffect(() => {
    //const userAuthenticated = sessionStorage.getItem("auth");
    //if (userAuthenticated) {
      //const foundUser = JSON.parse(loggedInUser);
      //setUser(foundUser);
      mounted.current = true;
      if (!auth) return
      
      console.log("userwww Authenticated!")
      newGetCategories()
      .then ( response => {
        //console.log("QQQQQMMMMMMM", response)
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
        dispatch(setRootPath('http://localhost:5000'))
    }
    else if (process.env.NODE_ENV === "production") {
        dispatch(setRootPath('https://fullstack-kp-f6a689f4a15c.herokuapp.com'))
    }
    else {
      console.log("invalid NODE_ENV ")
    }
  }, [dispatch])

  /*
  useEffect(() => {
    mounted.current = true;
    if (!token) return
     newGetCategories()
    .then ( response => {
      //console.log("QQQQQMMMMMMM", response)
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
  }, [token])
  */

 /*
  if(!token) { 
    return <Login setToken={setToken} setAuth={setAuth} />
  }
  */
 
  if(!auth) { 
    //console.log("nnnnswwwwwwwww")
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
            </Routes>
            </BrowserRouter>
        </>
  );
}

export default App;
