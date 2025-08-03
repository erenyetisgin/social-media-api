const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getPostById,
} = require("../controllers/postController");
const router = express.Router();

// Route to create a new post
router.post("/", createPost);

// Route to update a post by ID
router.put("/:id", updatePost);

// Route to delete a post by ID
router.delete("/:id", deletePost);

// Route to get a post by ID
router.get("/:id", getPostById);

module.exports = router;
