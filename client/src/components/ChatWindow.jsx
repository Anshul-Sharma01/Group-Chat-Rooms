import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);

    function sendChat() {
        if (chat.trim() !== "") {
            socket.emit("chats", chat); // Emit the chat message to the server
            setChat(""); // Clear the input field after sending
        }
    }

    useEffect(() => {
        // Create the socket connection only when the ChatWindow component mounts
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        // Listen for the broadcast messages
        newSocket.on("broadcast", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Listen for chat messages
        newSocket.on("message", (message) => {
            setChats(prevChats => [...prevChats, message]);
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

    return (
        <>
            <h1>Chat-Window</h1>
            <div className="chat-messages">
                <section className="flex flex-col justify-start items-center w-[100%] gap-5 bg-gray-400 p-4 h-96 overflow-y-scroll">
                    {messages.map((msg, index) => (
                        <p className="bg-slate-800 px-2 py-4 rounded-md" key={index}>{msg}</p>
                    ))}
                    {chats.map((msg, index) => (
                        <p className="bg-slate-800 px-2 py-4 rounded-md" key={index}>{msg}</p>
                    ))}
                </section>
                <div className="flex">
                    <input
                        type="text"
                        className="bg-gray-600 w-full h-full px-2 py-4"
                        placeholder="Enter message"
                        value={chat}
                        onChange={(e) => setChat(e.target.value)}
                    />
                    <button onClick={sendChat} className="w-1/3">Send</button>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;
