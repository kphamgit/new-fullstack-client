import React, { useContext } from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useEffect, useState } from 'react';
//import { SocketContext } from '../Home';
import { SocketContext } from '../App';
import { useSelector } from 'react-redux';


const ChatPage = () => {

    const socket = useContext(SocketContext);
    
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.user.value)


    useEffect(() => {
      //console.log("in ChatPage socket id"+ socket.id)
      socket.on('chat', (data) => setMessages([...messages, data]));
      return () => {
        socket.off("chat")
      }   
    }, [socket, messages]);

    /*
    useEffect(() => {
        // no-op if the socket is already connected
        console.log(" ChatPage connecting to server")
        socket.connect();
        return () => {
          socket.disconnect();
        };
    }, [socket]);
    */

    return (
      
        <div>
          <ChatBody messages={messages}  />
          <p></p>
          <ChatFooter socket={socket} />
        </div>
     
    );
  };
  
  export default ChatPage;