import react, { useEffect, useState } from 'react'
import './App.css'    //For tailwind directory
import MessageList from './Components/MessageList.jsx'    //Message dispaly component
import MessageInput from "./Components/MessageInput.jsx"; //Message input component.
import Login from "./Pages/Login.jsx";
import { io } from "socket.io-client";    //Socket.io-client
import userChatStore from "./Store/Store.js";  //Store for user chat data.



//Create connection on each load. When unmounted , connection disconnects automatically.
const socket = io.connect("http://localhost:8000", {
  transports: ["websocket"],
  withCredentials: true
});

//Main component
function App() {
  const { messages, username, rooms , inRoom, userLoggedIn , setMessages, setRooms, setInRoom , setUserLoggedIn, setUsername} = userChatStore()

  useEffect(()=>{
    console.log(messages);
  }, [messages])
  
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


  //To trigger the "joinRoom" event when user enters a roomname.
  useEffect(() => {
      socket.emit("joinRoom", rooms);
  } , [ rooms ])

  //When user submits a message.
  const handleSendMessage = (newMessage) => {
    //Checks if user is currently in a room. If yes, sends message to "RoomMessage" event else to "sendMessage"
    if(inRoom){
      socket.emit("RoomMessage", { room: rooms, message: newMessage });
    }else{
      socket.emit("sendMessage", newMessage);
    }
    setMessages(newMessage);   //Sets the message in any situation to display it in the screen
  };

  
  //Triggers when user clicks on "Leave room" button to remove the room
  const leaveRoom = () => {
    socket.emit("leaveRoom" , rooms);
  }

  //All listening events.
  //Listens to "connect" event.
  socket.on("connect", ()=>{
    console.log(`Connected! id: ${socket.id}`);
  })

  //Listens when the server sends a messge on "sendMessage" event.
  socket.on("sendMessage", (msg)=>{
    setMessages(msg);
  })

  //Listens when server sends "sentRoomMessage" event.
  socket.on("sentRoomMessage" , (msg) => {
    setMessages(msg);
  })

  //Listens when server joins the user to requested room.
  socket.on("joinedRoom", (msg) => {
    setInRoom(true);
    setMessages(msg);
  })

  //Listens when server removes user from the room currently in.
  socket.on("leftRoom", (msg) => {
    setInRoom(false);
    setRooms("");
    setMessages(msg);
  })

  return (
    <>
    {!userLoggedIn && <Login setUserLoggedIn = { setUserLoggedIn } setUsername = { setUsername } /> }
    {
      userLoggedIn &&
      <div className="w-9/12 mx-auto mt-10 p-4 border h-9/12 rounded-lg shadow-lg bg-white">
        <div className='flex justify-between align-center'>
        <h2 className="text-xl font-bold mb-2">Chat Application</h2>
        <h3>{ username }</h3>
        </div>
        <MessageList messages={messages} />
        <MessageInput onSend={ handleSendMessage } leaveRoom = { leaveRoom } />
      </div>
    }
    </>
  );
}

export default App
