const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();

const pool = require("../config/db");

// COACH CREATE CLIENT

router.post("/create-client",

async(req,res)=>{

try{

const{name,email,password}=req.body;

if(!name || !email || !password){

return res.status(400).json({

message:"Missing Fields"

});

}

const hash=

await bcrypt.hash(password,10);

await pool.query(

`INSERT INTO users
(name,email,password,role,is_active)

VALUES($1,$2,$3,'client',true)`,

[name,email,hash]

);

res.json({

message:"Client Created"

});

}catch(error){

console.log(error);

res.status(500).json({

message:"Server Error"

});

}

});

module.exports=router;
