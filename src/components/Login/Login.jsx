import React, { useState, useEffect } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Chatroom from "../Chatroom/Chatroom";
import { db } from '../../firebase'; 
import { collection, addDoc } from "firebase/firestore"; 
import { query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const usersRef = collection(db, "users");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const q = query(usersRef, where("username", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {

        localStorage.setItem("username", email); 
        localStorage.setItem("name", name);   
        navigate("/Chatroom");
      } else {
        const newUser = {
          username: email,
          password: password,
          name: ""
        };
  
        await addDoc(usersRef, newUser); 
        localStorage.setItem("username", email);
        localStorage.setItem("name", name);

        navigate("/Chatroom");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div id="contact" className="container m-auto mt-16">
      <div 
       className="relative mb-5">
        <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
          Login
        </h3>
        <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
      </div>

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
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input
              className="px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <input
              className="px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg w-full"
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} 
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
