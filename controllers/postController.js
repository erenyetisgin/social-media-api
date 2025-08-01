const postService = require("../services/postService");

exports.createPost = async (req, res, next) => {
  try {
    const postData = req.body;
    const newPost = await postService.createPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.getPostsByUserId = async (req, res, next) => {
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
