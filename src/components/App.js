import React, {useState, useRef, useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './auth/Login'
import Logout from './auth/Logout';
import Home from './Home';
import Subcategory from './Subcategory';
import Unit from './Unit';
import QuizAttempt from './QuizAttempt';
import QuizAttemptLive from './QuizAttemptLive';

import {getIds, getCategories } from './services/list';

import io from "socket.io-client";
import Games from './Games';
import { MatchGame } from './MatchGame';

import { QuizAttemptsManager } from './admin/QuizAttemptsManager';
import { CategoriesManager } from './admin/CategoriesManager';

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
export const SocketContext = React.createContext();
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
//the following code DOES NOT make a connection. It just prevents
//an immediate connection
const socket = io.connect(URL, {
   autoConnect: false
});
export function App(props) {
  const [token, setToken] = useState()
  const [categories, setCategories] = useState([])
  const [subCategoryIds, setSubCategoryIds] = useState([])
  const [gameIds, setGameIds] = useState([])
  const [unitIds, setUnitIds] = useState([])
  const [quizIds, setQuizIds] = useState([])
  const mounted = useRef(true);

  const auth = getAuth();
  //console.log("after calling getTToken ttoken=", auth)

  useEffect(() => {
    //console.log(" App starting EEEEYYYYYYYYYYYEEEEEEEEEEEEEEE")
    mounted.current = true;
    if (!auth) return
    getCategories()
    .then ( response => {
      if(mounted.current) {
        setCategories(response.data);   
      }
    })
    getIds()
    .then((response) => {
        //console.log("BBBBBBBBBBBBBBBBBBBBB", response.data)
        setSubCategoryIds(response.data.sub_category_ids)
        setQuizIds(response.data.quiz_ids)
        setGameIds(response.data.game_ids)
    })
    return () => mounted.current = false;
  },[auth])

  if(!auth) { 
    return <Login setToken={setToken} setAuth={setAuth} />
  }
  return (
    <>
     <SocketContext.Provider value={socket}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element = {<Home categories={categories} socket={socket}/>} />
              <Route path="/logout" element = {<Logout setToken={setToken} setAuth = {setAuth} />} />
              { subCategoryIds.map(subcat_id => (
                  <Route key={subcat_id.id} path={`/sub_categories/${subcat_id.id}`} element={<Subcategory subcat_id = {subcat_id.id} />} />
                  ))
              }
              { unitIds.map(unit_id => (
                  <Route key={unit_id} path={`/units/${unit_id}`} element={<Unit it = {unit_id} />} />
                  ))
              }
              {
                quizIds && quizIds.map(quiz_id => {
                return (
                  <>
                  <Route key={quiz_id} path={`/quiz_attempts/take_quiz/${quiz_id}`} element={<QuizAttempt quizId={quiz_id} />} />
                  <Route key={quiz_id} path={`/quiz_attempts/take_live_quiz/${quiz_id}`} element={<QuizAttemptLive quizId={quiz_id} />} />
                  </>
                  )
                })
             }
             { gameIds && gameIds.map(game_id => {
              return (
                <Route key={game_id} path={`/matching_games/play/${game_id}`} element={<MatchGame id={game_id} />} />
              )
              })
            }
            <Route path="/matching_games" element = {<Games />} />
            <Route path={`/manage_categories`} element={<CategoriesManager categories={categories} />} />
            <Route path={`/manage_quiz_attempts`} element={<QuizAttemptsManager />} />
            </Routes>
            </BrowserRouter>
            </SocketContext.Provider>
    </>
  )
}
export default App;