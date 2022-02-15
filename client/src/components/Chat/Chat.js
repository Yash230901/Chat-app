import React, { useState, useEffect } from 'react'
import { user } from "../Join/Join"
import "./Chat.css"
import Message from "../Message/Message"
import socketIo from "socket.io-client"
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../img/close.png"
let socket;
const ENDPOINT = "https://demo-message-app.herokuapp.com/"
const Chat = () => {
  const [id, setId] = useState("")
  const [messages, setMessages] = useState([])
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit('message', { message, id });
    document.getElementById("chatInput").value = "";
  }
  console.log(messages)
  useEffect(() => {

    socket = socketIo(ENDPOINT, { transports: ['websocket'] })
    socket.on('connect', () => {
      setId(socket.id);
      console.log("New Connection")
    })
    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setMessages([...messages, data])


      socket.on(`userJoined`, (user, message) => {
        setMessages([...messages, data])
        console.log(user, message)
      })

      socket.on("leave", ({ user, message }) => {
        setMessages([...messages, data])
        console.log(user, message);
      })
    })

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data])
      console.log(data.message, data.user, data.id)
    })
    return () => {
      socket.off();
    }
  }, [messages])




  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>CHAT APP</h2>
          <a href="/"><img src={closeIcon} alt="close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {
            messages.map((item, i) => <Message user={item.id === id ? '' : item.user} classs={item.id === id ? 'right' : 'left'} message={item.message} />)
          }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(e)=>e.key==='Enter' ? send():null} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">Send</button>
        </div>
      </div>

    </div>

  )
}

export default Chat