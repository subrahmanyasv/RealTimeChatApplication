# Real-time Chat Application using Socket.io (In development)

A real-time chat application built with **Node.js, Express, and Socket.io**. Users can send messages, join/leave rooms, and communicate instantly.  

##  Features  
- Real-time messaging with WebSockets  
- Room-based chat functionality  
- Modular WebSocket event handling  
- Lightweight and easy to extend  

## 🛠️ Tech Stack  
- **Backend**: Node.js, Express, Socket.io  
- **Frontend**: React (with Socket.io-client)  

##  Getting Started  

### 1⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/RealTimeChatApplication.git
cd RealTimeChatApplication
```

### 2⃣ Install Dependencies  
#### **Backend**  
```bash
cd Backend  
npm install
```
#### **Frontend**  
```bash
cd Frontend  
npm install
```

### 3⃣ Run the Application  
#### **Start Backend**  
```bash
cd Backend  
npm start 
```
#### **Start Frontend**  
```bash
cd Frontend  
npm run dev  
```

### 4⃣ Open in Browser  
Visit: **`http://localhost:5173`**  

## 🏰 Project Structure  
```
/project-root
 ├── /Backend         # Backend (Node.js + Socket.io)
 │   ├── index.js     # Main server file
 │   ├── /Modules
 │   │   ├── SocketHandler.js  # Modular WebSocket logic
 │   ├── package.json  
 ├── /Frontend        # Frontend (React + Socket.io-client)
 │   ├── src
 │   │   ├── App.jsx  
 │   │   ├── App.css  
 │   │   ├── Main.jsx  
 │   │   ├── /Components
 │   │   │   ├── MessageInput.jsx
 │   │   │   ├── MessageList.jsx
 │   ├── index.html
 │   ├── vite.config.js
 │   ├── .eslintrc.js
 │   ├── package.json  
 │   └── ...
 ├── README.md  
```

## 🎯 API & WebSocket Events  
### **💽 WebSocket Events**
| Event Name  | Direction  | Description |
|-------------|-----------|-------------|
| `connect`   | Client → Server | Establishes connection |
| `sendMessage` | Client ↔ Server | Sends and receives messages |
| `joinRoom`  | Client → Server | Joins a specific chat room |
| `leaveRoom` | Client → Server | Leaves the chat room |
| `RoomMessage` | Client → Server | Sends message to a specific room |
| `sentRoomMessage` | Server → Client | Broadcasts message to a room |

## 🤝 Contributing  
Feel free to fork, modify, and submit pull requests!  
For any queries, feel free to contact us at subrahmanyavaidya7@gmail.com

