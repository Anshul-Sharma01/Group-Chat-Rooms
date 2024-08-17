const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server, {
    cors : {
        origin : "*"
    }
});





io.on("connection", (socket) => {
    console.log("New Web-Socket Connection");

    socket.emit("checkConn", "Socket is successfully connected");

    // Broadcast when a user connects;
    socket.broadcast.emit('broadcast', 'A new user has joined the chat');

    // Runs when client disconnects
    socket.on("disconnect", () => {
        io.emit('broadcast', "A user has left the chat")
    })

    // io.emit();

    socket.on("message", (payload) => {
        console.log("Payload : ", payload);
        io.emit("message", payload);
    })
})





server.listen(5000 , () => {
    console.log("Server is listening at port 5000");
})

