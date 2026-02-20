const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");


// ============================
// REGISTER USER
// ============================

router.post("/register", async (req, res) => {

try {

const { name, email, password, role } = req.body;

if (!name || !email || !password) {

return res.status(400).json({

message: "Missing fields"

});

}


// check existing user

const existingUser = await pool.query(

"SELECT id FROM users WHERE email=$1",

[email]

);

if (existingUser.rows.length > 0) {

return res.status(400).json({

message: "User already exists"

});

}


// hash password

const hashedPassword = await bcrypt.hash(

password,

10

);


// insert user

const result = await pool.query(

`INSERT INTO users
(name,email,password,role)
VALUES($1,$2,$3,$4)
RETURNING id,name,email,role`,

[
name,
email,
hashedPassword,
role || "client"
]

);


// token

const token = jwt.sign(

{

id: result.rows[0].id,
role: result.rows[0].role

},

process.env.JWT_SECRET || "secret",

{ expiresIn: "7d" }

);


res.status(201).json({

message: "User Registered",

token,

user: result.rows[0]

});

}

catch (err) {

console.error("REGISTER ERROR:", err);

res.status(500).json({

message: "Server Error"

});

}

});


// ============================
// LOGIN USER
// ============================

router.post("/login", async (req, res) => {

try {

const { email, password, role } = req.body;


if (!email || !password) {

return res.status(400).json({

message: "Missing credentials"

});

}


// find user

const result = await pool.query(

"SELECT * FROM users WHERE email=$1",

[email]

);

if (result.rows.length === 0) {

return res.status(400).json({

message: "Invalid credentials"

});

}

const dbUser = result.rows[0];


// role check

if (role && dbUser.role !== role) {

return res.status(400).json({

message: "Wrong role"

});

}


// password check

const validPass = await bcrypt.compare(

password,

dbUser.password

);

if (!validPass) {

return res.status(400).json({

message: "Invalid password"

});

}


// token

const token = jwt.sign(

{

id: dbUser.id,
role: dbUser.role

},

process.env.JWT_SECRET || "secret",

{ expiresIn: "7d" }

);


res.json({

message: "Login Success",

token,

user: {

id: dbUser.id,
name: dbUser.name,
email: dbUser.email,
role: dbUser.role

}

});

}

catch (err) {

console.error("LOGIN ERROR:", err);

res.status(500).json({

message: "Server Error"

});

}

});


module.exports = router;