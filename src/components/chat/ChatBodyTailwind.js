import React from 'react';
import { useRef, useEffect } from 'react';

const ChatBodyTailwind = ({messages}) => {

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ block: 'nearest', inline: 'start'  })
    }    
    
  //messagesEndRef.current?.scrollIntoView({ behavior: "smooth",  block: 'nearest', inline: 'start'  })

  //const navigate = useNavigate();

  /*
  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };
*/
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/*This shows messages sent from you*/}
      <div className='m-1 h-40 text-sm bg-green-200 overflow-scroll'>
      <div>
        {messages.map((message) =>
            <div key={message.id}>
                <p ref={messagesEndRef}>{message.name}: {message.text}</p>
            </div>
        )}
      </div>
      </div>
    </>
  );
};

export default ChatBodyTailwind
