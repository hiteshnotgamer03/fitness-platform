const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");

// ======================================
// REGISTER USER
// ======================================

router.post("/register", async (req, res) => {

try {

const { name, email, password, role } = req.body;

if (!name || !email || !password) {

return res.status(400).json({

message: "Name, Email and Password required"

});

}

// check existing email

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

const hashedPassword = await bcrypt.hash(password, 10);

// insert new user

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

// generate token

const token = jwt.sign(

{
id: result.rows[0].id,
role: result.rows[0].role
},

process.env.JWT_SECRET || "secret",

{ expiresIn: "7d" }

);

return res.status(201).json({

message: "User Registered",

token,

user: result.rows[0]

});

} catch (error) {

console.error("REGISTER ERROR :", error);

return res.status(500).json({

message: "Server Error"

});

}

});


// ======================================
// LOGIN USER
// ======================================

router.post("/login", async (req, res) => {

try {

const { email, password, role } = req.body;

if (!email || !password) {

return res.status(400).json({

message: "Email and Password required"

});

}

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

// role validation

if (role && dbUser.role !== role) {

return res.status(400).json({

message: "Wrong role selected"

});

}

// password check

const validPassword = await bcrypt.compare(

password,

dbUser.password

);

if (!validPassword) {

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

return res.json({

message: "Login Successful",

token,

user: {

id: dbUser.id,
name: dbUser.name,
email: dbUser.email,
role: dbUser.role

}

});

} catch (error) {

console.error("LOGIN ERROR :", error);

return res.status(500).json({

message: "Server Error"

});

}

});

module.exports = router;