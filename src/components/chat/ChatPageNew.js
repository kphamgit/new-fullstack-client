import React, { useContext } from 'react'
import ChatBodyNew from './ChatBodyNew'
//import ChatFooter from './ChatFooter'
import { useEffect, useState } from 'react';
//import { SocketContext } from '../Home';
import { SocketContext } from '../App';
import ChatFooterNew from './ChatFooterNew';


const ChatPageNew = () => {

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
      <div style={{display:"flex", flexDirection:"row",  justifyContent:"flex-end"}} >
        <div style={{width:"66vw"}}>
          
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
           <div>
           <ChatBodyNew messages={messages}  />
          </div>
         <div>
         <ChatFooterNew socket={socket} />
        </div>
        </div>
      </div>
    );
  };
  
  export default ChatPageNew;