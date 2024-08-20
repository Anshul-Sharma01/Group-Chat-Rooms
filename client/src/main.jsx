import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatWindow from './components/ChatWindow.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/chats' element={<ChatWindow/>} />
      </Routes>
    </BrowserRouter>
)
