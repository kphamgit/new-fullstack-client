import React, { useContext } from 'react'
import ChatBodyTailwind from './ChatBodyTailwind'
import { useEffect, useState } from 'react';
import { SocketContext } from '../App';
import ChatFooterTailwind from './ChatFooterTailwind';


const ChatPageTailwindSave = ({layout}) => {

    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      //console.log("in ChatPage socket id"+ socket.id)
      socket.on('chat', (data) => setMessages([...messages, data]));
      return () => {
        socket.off("chat")
      }   
    }, [socket, messages]);
    //flex_row or flex_column
    if (layout === "flex_row") {
    return (
      <>
        <div className='grid grid-rows-7'  >
        <div  className='bg-red-500 row-span-5' >
          <ChatBodyTailwind messages={messages}  />
          </div>
          <div className='bg-blue-300 row-span-2'>
          <ChatFooterTailwind socket={socket}/>
          </div>
          
        </div>
        </>
    );
    }
    else {
      return (
        <>
        <div className='grid grid-cols-5'  >
          <div className='col-span-2' >
          <ChatFooterTailwind socket={socket}/>
          </div>
          <div className='col-span-3 bg-red-500' >
          <ChatBodyTailwind messages={messages}  />
          </div>
        </div>
        </>
    );
    }
  };
  
  export default ChatPageTailwind;