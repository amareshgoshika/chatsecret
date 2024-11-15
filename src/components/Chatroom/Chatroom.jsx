import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase'; // Import your Firebase instance
import { collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore"; // Add necessary imports

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name") || "Anonymous";
  
  // Reference for the messages container to scroll to the bottom
  const messagesEndRef = useRef(null);

  // Fetch messages from Firestore in real-time and order by timestamp
  useEffect(() => {
    const messagesRef = collection(db, "messages"); // Messages collection in Firestore
    const q = query(messagesRef, orderBy("id", "asc")); // Order messages by id (ascending)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => doc.data());
      setMessages(newMessages); // Update the state with new messages
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(), // Unique message id (use Firestore auto-generated id in production)
      username, // Store the email as the identifier
      name, // Store the user's display name
      text: newMessage,
    };

    try {
      // Save the message to Firestore
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, message); // This will add the new message to Firestore

      setNewMessage(''); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  // Scroll to the bottom when messages are updated
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
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.name} ({msg.username}):</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This will scroll to the bottom */}
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
