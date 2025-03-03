//This module handles all the socket functionality needed for this operation.
//It includes the socket connection, sending messages, joining and leaving rooms, and listening to the server.


import { io } from "socket.io-client";
import userChatStore from "../Store/Store.js";


//Create connection on each load. When unmounted , connection disconnects automatically.
const socket = io.connect("http://localhost:8000", {
    transports: ["websocket"],  //To use WebSockets
    withCredentials: true,  //To allow cookies
    reconnection: true,     //Reconnects if connection is lost.
    reconnectionAttempts: 5     //Attempts to reconnect 5 times.
});

//We cannot directly call userChatStore() as this is not a functional component. So we destructure the values from the store using .getState() method.
const { messages , rooms , inRoom , setMessages, setRooms, setInRoom } = userChatStore.getState();

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

// Function to join a room
const joinRoom = (roomName) => {
    socket.emit("joinRoom", roomName);
};

const socketListeners = () =>{
  //All listening events.
  //Listens to "connect" event.
  socket.on("connect", ()=>{
    console.log(`Connected! id: ${socket.id}`);
  })

  //Listens when the server sends a messge on "sendMessage" event.
  socket.on("sendMessage", (message)=>{
    setMessages(message);
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

}
export { socket , handleSendMessage , leaveRoom , joinRoom , socketListeners }