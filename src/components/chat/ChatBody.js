import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./ChatPage.module.css";
import { useRef, useEffect } from 'react';

const ChatBody = ({messages}) => {

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ block: 'nearest', inline: 'start'  })
    }    
    
  //messagesEndRef.current?.scrollIntoView({ behavior: "smooth",  block: 'nearest', inline: 'start'  })

  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])



  return (
    <>
      {/*This shows messages sent from you*/}
      <div className={styles.message__container}>
        {messages.map((message) =>
            <div className={styles.message__chats} key={message.id}>
                <p ref={messagesEndRef}>{message.name}: {message.text}</p>
             
            </div>
        )}
      </div>
    </>
  );
};

export default ChatBody
