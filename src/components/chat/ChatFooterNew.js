import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./ChatPageNew.module.css";
//import ControlledTextarea from './ControlledTextarea';

const ChatFooterNew = ({socket}) => {
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
    <span style={{display:"flex"}}>
      <form className="form" onSubmit={handleSendMessage}>
        <div style={{display:"flex"}}>
        <textarea
          type="text"
          placeholder="Write message"
          className={styles.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        
        <button className={styles.sendBtn}>Send</button>
        </div>
      </form>
    </span>
  );
};

export default ChatFooterNew;