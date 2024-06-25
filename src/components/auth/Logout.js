import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
//import { Context } from '../App/App';
//import { Context } from '../App/App';
//import styled from 'styled-components'
//import { setTokenValue } from '../../redux/token';
//import { useDispatch, useSelector } from 'react-redux';
//import { clearUserName } from '../../redux/username';
//import Button from 'react-bootstrap/Button'
//import "bootstrap/dist/css/bootstrap.min.css"
import { SocketContext } from '../App.js';

export default function Logout ({setToken, setAuth}) {
    const socket = useContext(SocketContext);
    //const rootpath = useSelector((state) => state.rootpath.value)
    //const dispatch = useDispatch()
/*
    useEffect(() => {
        return () => {
          console.log("Socket disconnecting")
            socket.disconnect();
          };
        //socket.disconnect();
    },[socket])
*/
    const navigate = useNavigate()
    useEffect(() => {
      async function logout() {
        //console.log("in logout")
        //dispatch(clearUserName())
        setToken(null)
        //setAuth(null)
        sessionStorage.clear()
        //fetch(`${rootpath}/logout`)
        socket.disconnect();
        navigate('/')
      }
      logout()
    },[navigate, setToken])
      
return (
    <>
    </>
)
}