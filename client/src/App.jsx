import { nanoid } from "nanoid";
import './App.css';
import { Link } from 'react-router-dom';

const randomId = nanoid(5);

function App() {
  function checkSocketConnection() {
    console.log(`Hello from client with Id : ${randomId}`);
  }

  return (
    <>
      <h1>Chat Room</h1>
      <button onClick={checkSocketConnection}>Check Socket Connection</button>

      <Link to="/chats">
        <button>Chats</button>
      </Link>
    </>
  );
}

export default App;
