import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { UserNameContext } from "../context/UserNameContext";

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);
    const chatEndRef = useRef(null);

    const { userName } = useContext(UserNameContext);

    function sendChat() {
        if (chat.trim() !== "") {
            const messagePayload = {
                message: chat,
                userName: userName,
            };
            socket.emit("chats", messagePayload); // Emit the chat message with the username
            setChat(""); // Clear the input field after sending
        } else {
            window.alert("Please give a message");
        }
    }

    useEffect(() => {
        // Create the socket connection only when the ChatWindow component mounts
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        // Listen for the broadcast messages
        newSocket.on("broadcast", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Listen for chat messages
        newSocket.on("message", (messagePayload) => {
            setChats((prevChats) => [...prevChats, messagePayload]);
        });

        // Emit a message when the user joins the chat window
        newSocket.emit("joinChat", "User has joined the chat window");

        // Clean up the listener and disconnect the socket when the component unmounts
        return () => {
            newSocket.emit("leaveChat", "User has left the chat window");
            newSocket.off("broadcast");
            newSocket.off("message");
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        //  Scroll to the bottom when a new chat message is added
        if(chatEndRef.current){
            chatEndRef.current.scrollIntoView({ behaviour : "smooth" });
        }
    }, [messages, chats]);

    return (
        <>
            <h1>Chat-Window</h1>
            <div className="chat-messages">
                <section className="flex flex-col justify-start items-center w-[100%] gap-5 bg-gray-400 p-4 h-96 overflow-y-scroll">
                    {messages.map((msg, index) => (
                        <p className="bg-slate-800 px-2 py-4 rounded-md text-white" key={index}>{msg}</p>
                    ))}
                    {chats.map((chatData, index) => (
                        <p
                            className={`bg-green-700 text-white px-4 py-2 rounded-lg self-start relative ${chatData.userName === userName ? 'self-end' : 'self-start'}`}
                            key={index}
                        >
                            <span className="block bg-green-800 px-2 text-xs w-fit text-right mt-1">{chatData.userName}</span>
                            {chatData.message}
                        </p>
                    ))}
                    <div ref={chatEndRef}/>
                </section>
                <div className="flex">
                    <input
                        type="text"
                        className="bg-gray-600 w-full h-full px-2 py-4 text-white"
                        placeholder="Enter message"
                        value={chat}
                        onChange={(e) => setChat(e.target.value)}
                    />
                    <button onClick={sendChat} className="w-1/3 bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;
