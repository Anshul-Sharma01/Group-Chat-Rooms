import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client";
import { nanoid, random } from "nanoid";
import './App.css'


const socket = io.connect("http://localhost:5000");
const randomId = nanoid(5);


function App() {

  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    socket.on("checkConn", (message) => {
      console.log(message);
    });

    socket.on("broadcast", (message) => {
      setMessages(prevMessage => [...prevMessage, message]);
    });

    return () => {
      socket.off("checkConn");
      socket.off("broadcast");
    };
  }, []);

  function checkSocketConnection(){
    socket.emit("message",  `Hello from client with Id : ${randomId}`);
  }

  return(
    <>
      <h1>Chat Room</h1>
      <button onClick={checkSocketConnection}>Check Socket Connection</button>

      <div className='chat-messages'>
        
        {
          messages.map((msg, index) => (
            <p key={index}> {msg} </p>
          ))
        }
      </div>
    </>
  )



}

export default App
