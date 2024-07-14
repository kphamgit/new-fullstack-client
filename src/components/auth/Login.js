import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import './Login.css';
//import Context from '../App/App.js'
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/user';
import { setLiveQuizFlag } from '../../redux/livequizflag';
import {login} from '../services/list'
import { Button } from "flowbite-react";
  
export default function Login({setToken, setAuth}) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  //const dispatch = useDispatch()
/*
  const handleSubmit_old = async e => {
    e.preventDefault();
    let url =  `${rootpath}/sessions`
    const credentials =  {
      username: username,
      password
    }
    const response = await axios.post(url,credentials )
    setToken(response.data.token);
    setAuth({auth: response.data.token})
  }
*/
  const handleSubmit = async e => {
    e.preventDefault();
    login({username: username, password} )
    .then (response => {
      setToken(response.token);
      setAuth({auth: response.token})
      dispatch(setLiveQuizFlag(false))
      dispatch(setUser(response.user))
    })
    .catch(error => {
      //console.log("Login error",error)
      alert(error.response.data.error)
      //alert(error.data)
    })
  }

  return(
    <div className="login-wrapper">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type={
            showPassword ? "text" : "password"
          }
          onChange={e => setPassword(e.target.value)} />
        </label>
        <label htmlFor="check">&nbsp;Show Password&nbsp;</label>
                <input
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                    }
                />
        <div>
          <br />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  )
}

//Login.propTypes = {
 // setToken: PropTypes.func.isRequired
//};