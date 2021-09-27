const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");
const jwt = require("jsonwebtoken");
const fileUpload = require('express-fileupload');
const bcrypt = require("bcrypt");
const saltRounds = 10;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// HELPER FUNCTIONS

let refreshTokens = [];

// Generate Access Token
const generateAccessToken = user => {
  return jwt.sign(
    { id: user.id }, 
    "mySecretKey",
    { expiresIn: "15m" }
  );
}

// Generate Refresh Token
const generateRefreshToken = user => {
  return jwt.sign(
    { id: user.id }, 
    "myRefreshSecretKey"  
  );
}

// Verify token
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid.");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated.");
  }
}

// ROUTES

app.post("/upload", (req, res) => {
  const userId = req.body.userId;
  const secureUrl = req.body.secureUrl;

  // Now upload file into database
  const newUpload = pool.query(
    "INSERT INTO images (user_id, image_url, private) VALUES($1, $2, $3) RETURNING *", [userId, secureUrl, false]
  );
  res.json(newUpload.rows);

});

app.post("/refresh", (req, res) => {
  // Take the refresh token from the user
  const refreshToken = req.body.token;

  // Send error if there is no token or it's invalid
  if (!refreshToken){
    return res.status(401).json("You are not authenticated.");
  }

  if (!refreshTokens.includes(refreshToken)){
    return res.status(403).json("Refresh token is not valid.");
  }

  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err & console.log(err);
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateAccessToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
  })

});

app.post("/login", async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1", [email]
    );
    if (user.rows.length === 0){
      console.log("There is no account associated with this email address. Please create a new account.");
      res.send("There is no account associated with this email address. Please create a new account.");
    } else {
      const hashedPassword = user.rows[0].password;
      bcrypt.compare(password, hashedPassword, function(err, result) {
        if (result === true) {
          // Generate access token
          const accessToken = generateAccessToken(user.rows[0]);

          // Generate refresh token
          const refreshToken = generateRefreshToken(user.rows[0]);
          refreshTokens.push(refreshToken);

          res.json({
            id: user.rows[0].id,
            email: user.rows[0].email,
            accessToken,
            refreshToken
          });
          // res.redirect("/feed");
        } else {
          console.log("The password entered is incorrect.")
          res.status(400).json("The password entered is incorrect.");
        }
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Logout route
app.post("/logout", verify, async(req, res) => {
  try {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a user
app.delete("/users/:id", verify, async(req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id == req.params.id){
      const deleteUser = await pool.query(
        "DELETE FROM users WHERE id = $1", [id]
      );
      res.status(200).json("User deleted!");
    } else {
      res.status(403).json("You are not allowed to delete this user.");
    }

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

// Get all images
app.get("/images", async(req, res) => {
  try {
    const allImages = await pool.query("SELECT * FROM images");
    res.json(allImages.rows);
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

// Get all pictures for a user
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

app.listen(5000, () => {
  console.log("Backend server is running on port 5000");
});