import { io } from "socket.io-client";    //Socket.io-client


import Navbar from "../Components/Navbar.jsx";
import MessageList from '../Components/MessageList.jsx'    //Message dispaly component
import MessageInput from "../Components/MessageInput.jsx"; //Message input component.
import userChatStore from "../Store/Store.js";  //Store for user chat data.

import { socket , handleSendMessage, leaveRoom, joinRoom , socketListeners } from "../Functionality/SocketFunctionality.js";
import { useEffect } from "react";
export default function Chat() {    
    const { messages, username, rooms , inRoom, userLoggedIn , setMessages, setRooms, setInRoom , setUserLoggedIn, setUsername} = userChatStore()

    //To trigger the "joinRoom" event when user enters a roomname.
    useEffect(() => {
        joinRoom(rooms);
    } , [ rooms ])

    useEffect(()=>{
      socketListeners();
    },[])

    return (
    <>
        <Navbar />
        {!userLoggedIn && <Login setUserLoggedIn = { setUserLoggedIn } setUsername = { setUsername } /> }
        {
            userLoggedIn &&
            <div className="w-9/12 mx-auto mt-10 p-4 border h-9/12 rounded-lg shadow-lg bg-white">
                <MessageList messages={messages} />
                <MessageInput onSend={ handleSendMessage } leaveRoom = { leaveRoom } />
            </div>
        }
        </>
    );
}