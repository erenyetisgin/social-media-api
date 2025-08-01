const express = require("express");
const {
  createPost,
  getPostsByUserId,
} = require("../controllers/postController");
const router = express.Router();

router.post("/", createPost);
router.get("/:userId", getPostsByUserId);

module.exports = router;
