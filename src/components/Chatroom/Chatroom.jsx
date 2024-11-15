import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase'; 
import { collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore"; 

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name") || "Anonymous";
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "messages"); 
    const q = query(messagesRef, orderBy("id", "asc")); 

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => doc.data());
      setMessages(newMessages); 
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      username, 
      name,
      text: newMessage,
    };

    try {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, message); 

      setNewMessage(''); 
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container m-auto mt-16">
      <div className="relative mb-5">
        <h3 className="text-3xl font-black text-gray-400 sm:text-2xl">
          {name}'s Chat
        </h3>
      </div>

      <div className="messages" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {messages
        .filter((msg) => msg.username === username)
        .map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.name} ({msg.username}):</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
