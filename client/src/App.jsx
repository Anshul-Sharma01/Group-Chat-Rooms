import { nanoid } from "nanoid";
import './App.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { UserNameContext } from "./context/UserNameContext";

function App() {
  
  
  
  const { userName, setUserName, randomId, setRandomId } = useContext(UserNameContext);
  
  useEffect(() => {
    const randId = nanoid(5);
    setRandomId(randId);
  }, [])
  
  function checkSocketConnection() {
    console.log(`Hello from client with Id : ${userName}`);
  }
  
  return (
    <>
      <h1 className="p-10">Chat Room</h1>
      <div className="flex gap-10">
        <form action="">

          <input 
            type="text" 
            className="bg-gray-700 border-2 py-2 px-2" 
            placeholder="Enter your username" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
          <Link to="/chats">
            <button 
              className={`px-4 py-2 rounded ${userName ? 'cursor-pointer' : 'cursor-not-allowed'} bg-blue-500 text-white`} 
              disabled={!userName}
            >
              Chats
            </button>
          </Link>

        </form>
        <button hidden onClick={checkSocketConnection}>Check Socket Connection</button>
      </div>
    </>
  );
}

export default App;
