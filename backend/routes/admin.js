
import axios from "axios";

export default function AdminDashboard(){

const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const createCoach = async ()=>{

try{

await axios.post(

"https://fitness-platform-bapk.onrender.com/api/admin/create-coach",

{
name,
email,
password
},

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);

alert("Coach Created");

}catch{

alert("Error");

}

};

return(

<div style={{color:"#FFD700",padding:"40px"}}>

<h1>ADMIN DASHBOARD</h1>

<h3>Create Coach</h3>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/>

<input
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<button onClick={createCoach}>

Create Coach

</button>

</div>

);

}
