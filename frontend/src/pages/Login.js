import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {

const navigate = useNavigate();

const { setUser } = useAuth();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("client");

const [loading,setLoading] = useState(false);


// LOGIN FUNCTION

const handleLogin = async(e)=>{

e.preventDefault();

setLoading(true);

try{

const res = await axios.post(

"https://fitness-platform-bapk.onrender.com/api/auth/login",

{
email,
password,
role
}

);

const token = res.data.token;


// Save token

localStorage.setItem("token",token);


// Decode JWT

const decoded = jwtDecode(token);


// Save user in context

setUser(decoded);


// ROLE BASED REDIRECT

if(decoded.role === "admin"){

navigate("/admin");

}

else if(decoded.role === "coach"){

navigate("/coach");

}

else{

navigate("/client");

}

}catch(err){

console.log(err);

alert("Login Failed — Check Email or Password");

}

setLoading(false);

};

return(

<div style={styles.container}>

<div style={styles.card}>

<h2 style={styles.title}>

Fitness Platform

</h2>

<form onSubmit={handleLogin}>


{/* ROLE SELECT */}

<div style={styles.roleContainer}>


<button
type="button"
onClick={()=>setRole("admin")}
style={{

...styles.roleBtn,

background:
role==="admin" ? "#FFD700":"#000",

color:
role==="admin" ? "#000":"#FFD700"

}}
>

Admin

</button>


<button
type="button"
onClick={()=>setRole("coach")}
style={{

...styles.roleBtn,

background:
role==="coach" ? "#FFD700":"#000",

color:
role==="coach" ? "#000":"#FFD700"

}}
>

Coach

</button>


<button
type="button"
onClick={()=>setRole("client")}
style={{

...styles.roleBtn,

background:
role==="client" ? "#FFD700":"#000",

color:
role==="client" ? "#000":"#FFD700"

}}
>

Client

</button>

</div>


{/* EMAIL */}

<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

style={styles.input}

required

/>


{/* PASSWORD */}

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

style={styles.input}

required

/>


{/* LOGIN BUTTON */}

<button

style={styles.button}

disabled={loading}

>

{loading ? "Logging in..." : "Login"}

</button>

</form>

</div>

</div>

);

}



const styles = {

container:{

minHeight:"100vh",

width:"100%",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:"#000000"

},

card:{

background:"#111111",

padding:"45px",

borderRadius:"14px",

width:"360px",

boxShadow:"0 15px 35px rgba(255,221,0,0.25)"

},

title:{

color:"#FFD700",

textAlign:"center",

marginBottom:"25px",

letterSpacing:"1px",

fontWeight:"700"

},

input:{

width:"100%",

padding:"12px",

marginBottom:"15px",

borderRadius:"8px",

border:"1px solid #FFD700",

background:"#000",

color:"#FFD700",

outline:"none"

},

button:{

width:"100%",

padding:"14px",

background:"#FFD700",

color:"#000",

border:"none",

borderRadius:"8px",

fontWeight:"bold",

cursor:"pointer",

transition:"0.3s"

},

roleContainer:{

display:"flex",

gap:"10px",

marginBottom:"15px"

},

roleBtn:{

flex:1,

padding:"10px",

borderRadius:"8px",

border:"1px solid #FFD700",

cursor:"pointer",

fontWeight:"bold",

transition:"0.3s"

},

};
