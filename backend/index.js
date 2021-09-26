const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.post("/login", async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1", [email]
    );
    if (user.rows.length === 0){
      res.send("There is no account associated with this email address. Please create a new account.");
    } else {
      const hashedPassword = user.rows[0].password;
      bcrypt.compare(password, hashedPassword, function(err, result) {
        console.log(result);
        if (result === true) {
          res.redirect("/feed");
        } else {
          console.log("wrong password")
          res.send("The password entered is incorrect.");
        }
      });
    }
    console.log(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Post a user
app.post("/register", async(req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    await bcrypt.hash(password, saltRounds, function(err, hash) {
      const newUser = pool.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *", [firstName, lastName, email, hash]
      );
      res.json(newUser.rows);
    });
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