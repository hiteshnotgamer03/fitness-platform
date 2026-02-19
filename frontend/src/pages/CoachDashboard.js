import React,{useState} from "react";
import axios from "axios";

export default function CoachDashboard(){

const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const createClient=async()=>{

await axios.post(

"https://fitness-platform-bapk.onrender.com/api/coach/create-client",

{name,email,password},

{

headers:{

Authorization:
`Bearer ${localStorage.getItem("token")}`

}

}

);

alert("Client Created");

};

return(

<div style={{color:"#FFD700",padding:"40px"}}>

<h1>Coach Dashboard</h1>

<h3>Create Client</h3>

<input
placeholder="name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={createClient}>

Create Client

</button>

</div>

);

}
