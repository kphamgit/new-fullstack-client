import React, { useContext } from 'react'
import ChatBodyTailwind from './ChatBodyTailwind'
import { useEffect, useState } from 'react';
import { SocketContext } from '../App';
import ChatFooterTailwind from './ChatFooterTailwind';


const ChatPageTailwind = () => {

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
        <div className='flex flex-col'>
         <div className='w-60'  >
            <ChatBodyTailwind messages={messages}  />
          <p></p>
            <ChatFooterTailwind socket={socket}/>
        </div>
        </div>
    );
  };
  
  export default ChatPageTailwind;