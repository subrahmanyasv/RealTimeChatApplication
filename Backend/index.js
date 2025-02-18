//Import all necessary modules.
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { socketHandler } from "./Modules/SocketHandler.js";

//Middlewares.
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

//HTTP server using app instance.
const httpServer = http.createServer(app);

//Socket server using HTTP server.
const io = new Server(httpServer, {
    cors: {
        origin : ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

//socket event handlers.
socketHandler(io);

//Get request handler[Just in case]
app.get("/", (req, res) => {    
    res.send("<h1> Hello from server! </h1>");

})

//Start the server.
httpServer.listen(8000, () => { console.log("Server is running on port 8000"); });