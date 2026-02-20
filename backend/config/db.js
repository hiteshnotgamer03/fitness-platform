const { Pool } = require("pg");

const pool = new Pool({

connectionString: process.env.DATABASE_URL,

ssl: {

rejectUnauthorized: false

},

max: 10, // max connections

idleTimeoutMillis: 30000,

connectionTimeoutMillis: 20000

});


// Error handler (VERY IMPORTANT)

pool.on("error", (err) => {

console.error("Unexpected PG Error:", err);

});


console.log("PostgreSQL Pool Ready");


module.exports = pool;