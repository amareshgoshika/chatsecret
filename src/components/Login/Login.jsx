import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Chatroom from "../Chatroom/Chatroom";
import { db } from '../../firebase'; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Firestore methods for adding data

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Reference to the Firestore collection where the users will be stored
  const usersRef = collection(db, "users");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure email and password are not empty
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    try {
      // Add user data to Firestore
      await addDoc(usersRef, {
        username: email,
        password: password,
        name: name,
      });
      
      // Redirect to the Chatroom page after successful registration
      navigate("/Chatroom");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div id="contact" className="container m-auto mt-16">
      {/* heading */}
      <div 
       className="relative mb-5">
        <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
          Login
        </h3>
        <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
      </div>

      {/* card*/}
      <div className="card-wrapper w-[90%] sm:w-[100%] mx-auto mt-5 flex items-center justify-center sm:flex-col">
        <div className="left w-[70%] flex items-center justify-center sm:flex-col sm:w-full">
          <form
            data-aos="zoom-in"
            className="flex justify-center items-center flex-col gap-5 w-[70%] md:w-[100%] sm:w-[95%] mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              className="px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg w-full"
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind email input (username)
            />
            <input
              className="px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Bind password input
            />
            <button
              className="bg-blue-500 w-full text-white font-semibold p-2 rounded-lg flex items-center justify-center space-x-1"
              type="submit"
            >
              <span>Start/Join Chat</span>
              <RiSendPlaneFill/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;