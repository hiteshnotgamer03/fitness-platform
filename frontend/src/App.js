import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import ClientDashboard from "./pages/ClientDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/login" element={<Login/>}/>

<Route
path="/admin"
element={
<ProtectedRoute role="admin">
<AdminDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/coach"
element={
<ProtectedRoute role="coach">
<CoachDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/client"
element={
<ProtectedRoute role="client">
<ClientDashboard/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

);

}
