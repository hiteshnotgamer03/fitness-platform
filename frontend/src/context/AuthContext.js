import React,
{
createContext,
useContext,
useState,
useEffect
}
from "react";

import { jwtDecode } from "jwt-decode";

// Create Context

export const AuthContext = createContext();

// Provider

export const AuthProvider = ({children})=>{

const [user,setUser] = useState(null);

useEffect(()=>{

const token = localStorage.getItem("token");

if(token){

try{

const decoded = jwtDecode(token);

setUser(decoded);

}catch(err){

console.log("Invalid token");

localStorage.removeItem("token");

}

}

},[]);


// Logout

const logout = ()=>{

localStorage.removeItem("token");

localStorage.removeItem("user");

setUser(null);

};

// Value

return(

<AuthContext.Provider value={{user,setUser,logout}}>

{children}

</AuthContext.Provider>

);

};


// ✅ THIS WAS MISSING (IMPORTANT)

export const useAuth = ()=>{

return useContext(AuthContext);

};
