import react, { useEffect, useState } from 'react'
import './App.css'    //For tailwind directory
import MessageList from './Components/MessageList.jsx'    //Message dispaly component
import MessageInput from "./Components/MessageInput.jsx"; //Message input component.
import Login from "./Pages/Login.jsx";
import { io } from "socket.io-client";    //Socket.io-client


//Create connection on each load. When unmounted , connection disconnects automatically.
const socket = io.connect("http://localhost:8000", {
  transports: ["websocket"],
  withCredentials: true
});

//Main component
function App() {
  const [messages, setMessages] = useState([]);   //Store all messages
  const [rooms , setRooms ] = useState("");     //Store the room name. Currently one one room allowed.
  const [ inRoom , setInRoom ] = useState(false);   //Check if room is joined or not.
  const [ userLoggedIn , setUserLoggedIn ] = useState(false);  //To check if user has loggedin?
  const [ username , setUsername ] = useState("");   //To store username


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
    setMessages([...messages, newMessage]);   //Sets the message in any situation to display it in the screen
  };

  
  //Triggers when user clicks on "Leave room" button to remove the room
  const leaveRoom = () => {
    socket.emit("leaveRoom" , rooms);
  }

  //All listening events.
  //Listens to "connect" event.
  socket.on("connect", ()=>{
    setMessages([...messages, `Connected! id: ${socket.id}`]);
  })

  //Listens when the server sends a messge on "sendMessage" event.
  socket.on("sendMessage", (message)=>{
    setMessages([...messages, message]);
  })

  //Listens when server sends "sentRoomMessage" event.
  socket.on("sentRoomMessage" , (msg) => {
    setMessages([...messages, msg]);
  })

  //Listens when server joins the user to requested room.
  socket.on("joinedRoom", (msg) => {
    setInRoom(true);
    setMessages([...messages, msg]);
  })

  //Listens when server removes user from the room currently in.
  socket.on("leftRoom", (msg) => {
    setInRoom(false);
    setRooms("");
    setMessages([...messages, msg]);
  })

  return (
    <>
    {!userLoggedIn && <Login setUserLoggedIn = { setUserLoggedIn } setUsername = { setUsername } /> }
    {
      userLoggedIn &&
      <div className="w-9/12 mx-auto mt-10 p-4 border h-9/12 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-2">Chat Application</h2>
        <MessageList messages={messages} />
        <MessageInput onSend={handleSendMessage} setRooms = { setRooms } leaveRoom = { leaveRoom } />
      </div>
    }
    </>
  );
}

export default App
