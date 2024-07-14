import React, { useContext } from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useEffect, useState } from 'react';
//import { SocketContext } from '../Home';
import { SocketContext } from '../App';


const ChatPage = () => {

    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      //console.log("in ChatPage socket id"+ socket.id)
      socket.on('chat', (data) => setMessages([...messages, data]));
      return () => {
        socket.off("chat")
      }   
    }, [socket, messages]);


    return (
      
        <div>
          <ChatBody messages={messages}  />
          <p></p>
          <ChatFooter socket={socket} />
        </div>
     
    );
  };
  
  export default ChatPage;