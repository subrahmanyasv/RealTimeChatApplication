export const socketHandler = (io) => {

    //On connection 
    io.on("connection", (socket) => {

        //When user sends a messge, broadcast it.
        socket.on("sendMessage", (message) => {
            console.log("Emitting message: " + message);
            socket.broadcast.emit("sendMessage", message);
        })

        //When user requests to join a room, join and send a responce 
        socket.on("joinRoom", (room) => {
            if (room === "") return;
            socket.join(room);
            socket.emit("joinedRoom", `Joined to room: ${room}`);
        })

        //When user requests to leave a room, remove and send a response.
        socket.on("leaveRoom", (room) => {
            socket.leave(room);
            socket.emit("leftRoom", `Left from room: ${room}`);
        })

        //When user sends a room message, emit it to the room except the sender.
        socket.on("RoomMessage", ({ room, message }) => {
            console.log(message);
            socket.to(room).emit("sentRoomMessage", message);
        })
    })

}