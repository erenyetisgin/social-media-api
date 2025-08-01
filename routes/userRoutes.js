const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Route to get a user by ID
router.get("/:id", getUser, async (req, res) => {
  res.status(200).json(res.user);
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

// Route to update a user by ID
router.put("/:id", getUser, async (req, res) => {
  const { name, username } = req.body;
  res.user.name = name || res.user.name;
  res.user.username = username || res.user.username;

  try {
    const updatedUser = await res.user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
});

// Route to delete a user by ID
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
}

module.exports = router;
