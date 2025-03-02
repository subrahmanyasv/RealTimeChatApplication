import { useState } from "react";
import useChatStore from "../Store/Store.js";

const MessageInput = ({ onSend , leaveRoom }) => {
    const { setRooms } = useChatStore();
    const [message, setMessage] = useState("");     //To store message before sending to parent.
    const [ room , setRoom ] = useState("");        //To store room name before sending to parent

    //Function that sends the message to parent for sending it to server through socket.
    const sendMessage = () => {
        if (message.trim()) {
            onSend(message);    //Props method to send message.
            setMessage(""); // Clear input box after sending
        }
    };

    //Function that sends the room name to parent for sending it to server through socket
    const setUserRoom = () =>{
        setRooms(room);     //Props method to send room
        setRoom("");        //Clear input box after sending.
    }

    return (
        <div>

            {/* Message input box */}
            <div className="flex space-x-2 mt-4">
            <input
                type="text"
                className="flex-grow p-2 border rounded-lg"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
                Send
            </button>
        </div>

        {/* Room input box */}
        <div className="flex space-x-2 mt-4">
            <input
                type="text"
                className="flex-grow p-2 border rounded-lg"
                placeholder="Room name..."
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && setUserRoom()} // Send on Enter
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={setUserRoom}>
                Join room
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={()=>{leaveRoom();}}>
                Leave room
            </button>
        </div>
        </div>
    );
};

export default MessageInput;