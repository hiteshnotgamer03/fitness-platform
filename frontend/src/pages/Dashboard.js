import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard(){

const { user , logout } = useAuth();

return(

<div style={{

height:"100vh",
background:"#000",
color:"#FFD700",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center"

}}>

<h1>Dashboard</h1>

<h3>

Welcome {user?.email}

</h3>

<h3>

Role :

{user?.role}

</h3>

<button onClick={logout}

style={{

marginTop:"20px",
padding:"10px",
background:"#FFD700",
border:"none"

}}

>

Logout

</button>

</div>

);

}
