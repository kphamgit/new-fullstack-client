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
import { getGames } from './services/list';
import io from "socket.io-client";
import Games from './Games';
import { MatchGame } from './MatchGame';


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
export const SocketContext = React.createContext();
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
//the following code DOES NOT make a connection. It just prevents
//an immediate connection
const socket = io.connect(URL, {
   autoConnect: false
});

function App() {

  //const userAuth = useRef(null)
  const [token, setToken] = useState()
  //const subcategory = useSelector((state) => state.subcategory.value)
  
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const user = useSelector((state) => state.user.value)
  const [games, setGames] = useState(null)
  const mounted = useRef(true);

  const dispatch = useDispatch()

  const auth = getAuth();
  //console.log("after calling getTToken ttoken=", auth)

  /*
  useEffect(() => {
    // no-op if the socket is already connected
    //console.log(" ChatPage connecting to server")
    socket.connect();
    // comment this out so that when the Home component dismounts, i.e, user
    //    go to another link, socket won't get disconnected.
    //    Leave to code here just for reference/learning
    //return () => {
    //  socket.disconnect();
    //};
},[]);
*/
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
      getGames()
      .then (response => {
        if(mounted.current) {
            console.log("RRRRRRRRR", response.data)
            setGames(response.data);
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
    <SocketContext.Provider value={socket}>
          <BrowserRouter>
            <NavBarComponent categories={categories} />
            
            <Routes>
              <Route path="/" element = {<Home socket={socket}/>} />
              <Route path="/logout" element = {<Logout setToken={setToken} setAuth = {setAuth} />} />
             { subcategories.map(subcat => (
                <Route key={subcat.id} path={`/sub_categories/${subcat.id}/*`} element={<Subcategory id = {subcat.id} name={subcat.name}/>} />
              ))
             }
               <Route path="/quiz_attempts/take_quiz/:quiz_id" element = {<QuizAttempt username={user.username} />} />
               <Route path="/matching_games" element = {<Games />} />

        {console.log("XXXXX", games)}
        {
            games && games.map(game => (
                <Route key={game.id} path={`/matching_games/play/${game.id}`} element={<MatchGame />} />
            ))
        }
            </Routes>
           
            </BrowserRouter>
            </SocketContext.Provider>
        </>
  );
}

export default App;
