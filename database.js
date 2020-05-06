const { Pool } = require("pg");
const dotenv = require('dotenv')

  dotenv.config()

 const connectionString = process.env.DATABASE_URL
const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "verge",
//   password: "codeGeek",
//   port: 5432,
  connectionString:connectionString
  
});
pool.on("connect", () => {
});
pool.on("error", (err) => {
});
module.exports = pool;
