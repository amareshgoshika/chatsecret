import React, { useState } from 'react';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const username = localStorage.getItem('username') || 'Anonymous';

  // Function to send a new message
  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(), 
      username,
      text: newMessage,
    };
    setMessages([...messages, message]);
    setNewMessage(''); // Clear the input field after sending
  };

  return (
    <div className="container m-auto mt-16">
        
      <div 
       className="relative mb-5">
        <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
          Username Chat
        </h3>
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg"
        />
        <button
          className="bg-blue-500 text-white font-semibold p-2 rounded-lg"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatroom;
