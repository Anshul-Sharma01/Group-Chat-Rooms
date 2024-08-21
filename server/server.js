const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("New Web-Socket Connection");

    // Emit connection success message
    socket.emit("checkConn", "Socket is successfully connected");

    // Broadcast when a user connects
    socket.broadcast.emit('broadcast', 'A new user has joined the chat');

    // Listen for chat messages and broadcast them
    socket.on("chats", (messagePayload) => {
        io.emit("message", messagePayload); // Broadcast the chat message to all clients
    });

    // Emit when a user disconnects
    socket.on("disconnect", () => {
        io.emit('broadcast', "A user has left the chat");
    });

    // Listen for generic messages
    socket.on("message", (payload) => {
        console.log("Payload : ", payload);
        io.emit("message", payload);
    });
});

server.listen(5000, () => {
    console.log("Server is listening at port 5000");
});
