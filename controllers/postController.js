const PostService = require("../services/PostService");
const ApiError = require("../errors/ApiError");

exports.createPost = async (req, res, next) => {
  try {
    const { userId, title, content } = req.body;

    const newPost = await PostService.createPost(userId, title, content);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const postData = req.body;
    const updatedPost = await PostService.updatePost(postId, postData);
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    await PostService.deletePost(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await PostService.getPostById(postId);
    if (!post) {
      throw new ApiError(404, "Post not found");
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
    const posts = await PostService.getPostsByUserId(userId, {
      cursor: cursor ? new Date(cursor) : undefined,
      pageSize: parseInt(pageSize, 10) || 10,
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
