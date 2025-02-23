//Import all necessary modules.
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookiesParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { socketHandler } from "./Modules/SocketHandler.js";
import { connectDB } from "./Connection/Connect.js";
import authenticationRouter from "./Routes/userRoutes.js";
import { isValidUserValidation } from "./Middlewares/authValidations.js";
import { decode } from "punycode";

//test
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;



//Middlewares.
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookiesParser());
app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

//HTTP server using app instance.
const httpServer = http.createServer(app);

//Database connection.
connectDB();

//Routes
app.use("/authentication", authenticationRouter);

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
app.get("/test", isValidUserValidation , (req, res) => {    
    res.send("<h1> Hello from server! </h1>");
})

//test cookie
app.get("/api/check-cookie", (req, res) => {
    if (req.cookies.token) {
        const token =  req.cookies.token;
        const decodedData =jwt.verify(token, JWT_SECRET_KEY);
        res.json(decodedData);
    } else {
        res.status(401).json({ hasCookie: false, message: "No cookie found" });
    }
});

//Start the server.
httpServer.listen(8000, () => { console.log("Server is running on port 8000"); });

process.on("SIGINT", async () => {
    console.log("Server shutting down. Closing database connection...");
    await mongoose.connection.close();
    process.exit(0);
});
