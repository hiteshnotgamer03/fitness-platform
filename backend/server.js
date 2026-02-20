require("dotenv").config();

const express = require("express");

const cors = require("cors");

const authRoutes = require("./routes/auth");

const adminRoutes = require("./routes/admin");

const coachRoutes = require("./routes/coach");

const app = express();

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/auth",authRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/coach",coachRoutes);


// HEALTH CHECK

app.get("/",(req,res)=>{

res.send("Backend Running");

});

app.get("/health",(req,res)=>{

res.json({

status:"ok",

message:"Fitness Platform API Healthy"

});

});

const PORT = process.env.PORT || 5000;
process.on("uncaughtException",(err)=>{

console.error("Uncaught Exception:",err);

});

process.on("unhandledRejection",(err)=>{

console.error("Unhandled Promise:",err);

});
app.listen(PORT,()=>{

console.log("Server running on port",PORT);

});
