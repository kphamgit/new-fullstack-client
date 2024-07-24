import React, { useContext } from 'react'
import ChatBodyTailwind from './ChatBodyTailwind'
import { useEffect, useState } from 'react';
import { SocketContext } from '../App';
import ChatFooterTailwind from './ChatFooterTailwind';


const ChatPageTailwind = ({layout}) => {

    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      //console.log("in ChatPage socket id"+ socket.id)
      socket.on('chat', (data) => setMessages([...messages, data]));
      return () => {
        socket.off("chat")
      }   
    }, [socket, messages]);

    if (layout === "flex_row") {
    return (
      <>
      <div>{layout}</div>
        <div className='grid grid-cols-1'  >
            <ChatBodyTailwind messages={messages}  />
          <p></p>
            <ChatFooterTailwind socket={socket}/>
        </div>
        </>
    );
    }
    else {
      return (
        <>
        <div className='grid grid-cols-2'  >
            <div><ChatBodyTailwind messages={messages}  /></div>
            <div><ChatFooterTailwind socket={socket}/></div>
        </div>
        </>
    );
    }
  };
  
  export default ChatPageTailwind;