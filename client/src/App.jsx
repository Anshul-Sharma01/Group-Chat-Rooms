import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client";
import { nanoid, random } from "nanoid";
import './App.css'


const socket = io.connect("http://localhost:5000");
const randomId = nanoid(5);


function App() {

  useEffect(() => {
    socket.on("checkConn", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("checkConn");
    }
  }, []);

  function checkSocketConnection(){
    socket.emit("message",  `Hello from client with Id : ${randomId}`);
  }

  return(
    <>
      <h1>Chat Room</h1>
      <button onClick={checkSocketConnection}>Check Socket Connection</button>
    </>
  )



}

export default App
