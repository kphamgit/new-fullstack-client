import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Textarea } from "flowbite-react";

const ChatFooterTailwind = ({socket}) => {
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.user.value)

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat', {
        text: message,
        name: user.user_name,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  }
  
  const handleKeyDown = (e) => {
      //console.log(e.key)
      if (e.key === "Enter") {
        sendMessage()
      }
  }
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage()
  };

  

  return (
    <div className=' m-1 mt-0'>
      <form onSubmit={handleSendMessage}>
        <Textarea
          type="text"
          placeholder="Write message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
         
        <div><Button className='bg-green-500' onClick={sendMessage}>Send</Button></div>
      </form>
    </div>
  );
};

export default ChatFooterTailwind;