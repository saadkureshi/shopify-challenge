const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "shopify_challenge"
});

module.exports = pool;