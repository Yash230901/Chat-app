import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Join from "./components/Join/Join.js"
import Chat from "./components/Chat/Chat.js"
import  "./App.css"
import React from 'react';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route path="/chat" exact element={<Chat />} />
      </Routes>
    </BrowserRouter>

  )
};

export default App;
