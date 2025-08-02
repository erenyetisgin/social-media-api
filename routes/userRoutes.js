const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const { getUserPosts } = require("../controllers/postController");

// Route to create a new user
router.post("/", createUser);

// Route to update a user by ID
router.put("/:id", updateUser);

// Route to delete a user by ID
router.delete("/:id", deleteUser);

// Route to get a user by ID
router.get("/:id", getUserById);

// Route to get posts by user ID
router.get("/:userId/posts", getUserPosts);

module.exports = router;
