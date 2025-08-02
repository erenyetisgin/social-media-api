const postService = require("../services/PostService");

exports.createPost = async (req, res, next) => {
  try {
    const postData = req.body;
    const newPost = await postService.createPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const postData = req.body;
    const updatedPost = await postService.updatePost(postId, postData);
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    await postService.deletePost(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postService.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { cursor, pageSize } = req.query;
    const posts = await postService.getPostsByUserId(userId, {
      cursor: cursor ? new Date(cursor) : undefined,
      pageSize: parseInt(pageSize, 10) || 10,
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
