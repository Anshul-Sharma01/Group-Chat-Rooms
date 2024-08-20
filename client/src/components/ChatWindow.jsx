import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        // Create the socket connection only when the ChatWindow component mounts
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        // Listen for the broadcast messages
        newSocket.on("broadcast", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Emit a message when the user joins the chat window
        newSocket.emit("joinChat", "User has joined the chat window");

        // Clean up the listener and disconnect the socket when the component unmounts
        return () => {
            newSocket.emit("leaveChat", "User has left the chat window");
            newSocket.off("broadcast");
            newSocket.disconnect();
        };
    }, []);

    return (
        <>
            <h1>Chat-Window</h1>
            <div className="chat-messages">
                <section className="flex flex-col justify-start items-center w-[100%] gap-5 bg-gray-400 p-4 h-96 overflow-y-scroll">
                        {messages.map((msg, index) => (
                            <p className="bg-slate-800 px-2 py-4 rounded-md"  key={index}>{msg}</p>
                        ))}
                </section>
                <div className="flex ">
                    <input type="text"  className="bg-gray-600 w-full h-full px-2 py-4" placeholder="enter message"/>
                    <button className="w-1/3">Send</button>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;
