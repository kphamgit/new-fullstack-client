import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
//import Context from '../App/App.js'
import { useDispatch, useSelector } from "react-redux";
//import { setUserName } from '../../redux/username';
//import { setTokenValue } from '../../redux/token';
//import { setRootPath } from '../../redux/rootpath';
import { setUser } from '../../redux/user';
import { setLiveQuizFlag } from '../../redux/livequizflag';
import { clearQuestion } from '../../redux/livequestion';
//import { faLinesLeaning } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


async function loginUser(rootpath, credentials) {
  let url =  `${rootpath}/sessions`
  const response = await axios.post(url,credentials )
  //console.log(response.data)
  //programming note: response is a promise. So handle it appropriately in caller 
  //function:  handleSubmit
  return response.data
}
  

/*
async function loginUser(rootpath, credentials) {

 let url =  `${rootpath}/sessions`
 return fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => { 
    //console.log("OOOOOOOOOOOOO", data)
    let test = data.json();
    console.log("IIIIIII", test)
    //return data.json()
    return test
   } )
}
   */


 
export default function Login({setToken, setAuth}) {
  const [showPassword, setShowPassword] = useState(false);
  const rootpath = useSelector((state) => state.rootpath.value)

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault();
    let url =  `${rootpath}/sessions`
    const credentials =  {
      username: username,
      password
    }
    const response = await axios.post(url,credentials )
    setToken(response.data.token);
    setAuth({auth: response.data.token})

    /*
    const data = loginUser(rootpath, {
      username: username,
      password
    })
    .then ((data) => {
      console.log("in handleSubmit data = "+data)
      setToken(data.token);
      setTToken({token: data.token})
     // dispatch(setUserName(inputusername))
      dispatch(setUser(data.user))
      //dispatch(setLiveQuizFlag(false))
    })
    */
    
    //if(!data.token) { 
      //console.log("Login.js token returned UNDEFINED (error)")
    //}
    //else {
     
      //dispatch(clearQuestion())
      //sessionStorage.setItem('user', username)
    //}
  }
  return(
    <div className="login-wrapper">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input 
          type={
            showPassword ? "text" : "password"
          }
          onChange={e => setPassword(e.target.value)} />
        </label>
        <label for="check">&nbsp;Show Password&nbsp;</label>
                <input
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                    }
                />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

//Login.propTypes = {
 // setToken: PropTypes.func.isRequired
//};