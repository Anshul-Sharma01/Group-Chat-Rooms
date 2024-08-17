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

    socket.on("message", (payload) => {
        console.log("Payload : ", payload);
        io.emit("message", payload);
    })
})





server.listen(5000 , () => {
    console.log("Server is listening at port 5000");
})

