import React from 'react';
import styles from "./HomeTeacher.module.css";
import { useRef, useEffect } from 'react';

const HomeTeacherBody = ({messages}) => {

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ block: 'nearest', inline: 'start'  })
    }    
    
  //messagesEndRef.current?.scrollIntoView({ behavior: "smooth",  block: 'nearest', inline: 'start'  })

  useEffect(() => {
    scrollToBottom()
  }, [messages])



  return (
    <>
      {/*This shows messages sent from you*/}
      <div className={styles.message__container}>
        {messages.map((message, index) =>
            <div className={styles.message__chats} key={index}>
                <p ref={messagesEndRef}>{message.user_name}: {message.question_number}</p>
             
            </div>
        )}
      </div>
    </>
  );
};

export default HomeTeacherBody
