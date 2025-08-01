const Post = require("../models/Post");

class PostRepository {
  async create(data) {
    Post.create(data);
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
}

module.exports = new PostRepository();
