import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../App.js';

export default function Logout ({setToken, setAuth}) {
    const socket = useContext(SocketContext);

    const navigate = useNavigate()
    useEffect(() => {
      async function logout() {
        //console.log("in logout")
        setToken(null)
        //setAuth(null)
        sessionStorage.clear()
        socket.disconnect();
        navigate('/')
      }
      logout()
    },[navigate, socket, setToken])
      
return (
    <>
    </>
)
}