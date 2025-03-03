import react, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'    //For tailwind directory
import Login from "./Pages/Login.jsx";
import Chat from "./Pages/Chat.jsx";
import userChatStore from "./Store/Store.js";  //Store for user chat data.

//Main component
function App() {
  const { setUserLoggedIn , userLoggedIn } = userChatStore()

  useEffect(() => { 
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith("isLoggedIn" + '='));
    if(cookie){
      const decoded = atob(cookie.split('=')[1]);
      if(decoded == "true"){
        setUserLoggedIn(true);
      }else{
        setUserLoggedIn(false);
      }
    }
  },[])

  return(
    <>
      <Routes>
        <Route path="/" element={ userLoggedIn ? <Navigate to = "/chat" /> : <Login />} />
        <Route path="/chat" element={ userLoggedIn ? <Chat /> : <Navigate to="/" />} />
      </Routes>
    </>
  )

  

  
}

export default App
