const Post = require("../models/Post");

class PostRepository {
  async create(data) {
    Post.create(data);
  }

  async update(postId, data) {
    return Post.findByIdAndUpdate(postId, data, { new: true });
  }

  async delete(postId) {
    return Post.findByIdAndDelete(postId);
  }

  async getPostById(postId) {
    return Post.findById(postId);
  }

  async findByUserId(userId, { cursor, limit }) {
    const query = { userId };
    if (cursor) {
      query.createdAt = { $lt: cursor };
    }
    return Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit + 1); // Fetch one extra to check for next page
  }

  async deleteAllByUserId(userId) {
    return Post.deleteMany({ userId });
  }
}

module.exports = new PostRepository();
