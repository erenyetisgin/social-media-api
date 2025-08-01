const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Route to create a new user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
});

module.exports = router;
