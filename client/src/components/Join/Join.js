import React, { useState } from 'react'
import "./Join.css"
import {Link} from "react-router-dom"
let user;


const sendUser=()=>{
  user=document.getElementById("joinInput").value;
  document.getElementById("joinInput").value="";
}
const Join = () => {
  const [name, setName] = useState("");
  return (
    <div className="joinPage">
      <div className="joinContainer">
       <h1>CHAT APP</h1>
       <input placeholder="Enter your Name" id="joinInput" type="name" onChange={(e)=>setName(e.target.value)} />
      <Link  onClick={(e)=>name===""? e.preventDefault():null} to="/chat">
        <button onClick={sendUser}className="LoginBtn">Log In</button>
        </Link> 
      </div>
    </div>
  )
}

export default Join
export{user}