const express = require('express');
const user = require('../MODELS/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Route to test user routes
router.get('/', (req, res) => {
  res.send('user routes');
});

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Trim spaces to avoid accidental white spaces
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check if user already exists
    const existingUser = await user.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    console.log("Entered password during registration: ", trimmedPassword);
    
    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    console.log("Hashed password after registration:", hashedPassword);
    
    // Create new user object
    const newUser = new user({
      name,
      email: trimmedEmail,
      password: hashedPassword
    });
    
    // Save user to database
    await newUser.save();

    // Return success message
    res.status(200).send({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send({ error: "Server error. Please try again." });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const reqUser = await user.findOne({ email });
    if (!reqUser) {
      return res.status(404).send({ error: "User not found" });
    }

    // Compare the entered password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, reqUser.password);

    // If the passwords don't match, return error
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    // If passwords match, generate JWT token
    const token = jwt.sign(
      { _id: reqUser._id.toString() },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' } // 1 hour expiration
    );

    // Send the response with user data and token
    res.status(200).send({
      reqUser,
      token,
      message: "Logged in successfully"
    });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ error: "Server error. Please try again." });
  }
});


module.exports = router;
