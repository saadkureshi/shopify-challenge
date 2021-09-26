const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES

// Post a user
app.post("/register", async(req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *", [firstName, lastName, email, password]
    );
    res.json(newUser.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all users
app.get("/users", async(req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a user
app.get("/users/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1", [id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a user
app.delete("/users/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE id = $1", [id]
    );
    res.json("User deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});