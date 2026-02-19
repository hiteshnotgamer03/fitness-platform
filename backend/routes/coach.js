const express=require("express");

const bcrypt=require("bcrypt");

const router=express.Router();

const pool=require("../config/db");

router.post("/create-client",

async(req,res)=>{

const{name,email,password}=req.body;

const hash=
await bcrypt.hash(password,10);

await pool.query(

`INSERT INTO users
(name,email,password,role,is_active)

VALUES($1,$2,$3,'client',true)`,

[name,email,hash]

);

res.json({message:"client created"});

});

module.exports=router;
