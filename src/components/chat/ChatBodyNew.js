import React from 'react';
import styles from "./ChatPageNew.module.css";
import { useRef, useEffect } from 'react';

const ChatBodyNew = ({messages}) => {

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ block: 'nearest', inline: 'start'  })
    }    
    
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/*This shows messages sent from you*/}
      <div className={styles.message__container}>
        {messages.map((message) =>
            <div key={message.id}>
                <p ref={messagesEndRef}>{message.name}: {message.text}</p>
            </div>
        )}
      </div>
    </>
  );
};

export default ChatBodyNew
