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
import { SocketContext } from '../Home';

export default function Logout ({setToken}) {
    //const socket = useContext(SocketContext);
    //const rootpath = useSelector((state) => state.rootpath.value)
    //const dispatch = useDispatch()
/*
    useEffect(() => {
        return () => {
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
        //fetch(`${rootpath}/logout`)
        navigate('/')
      }
      logout()
    },[])
      
    

return (
    <>
    </>
)
}