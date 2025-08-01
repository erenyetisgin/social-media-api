const PostRepository = require("../repositories/PostRepository");

class PostService {
  async createPost(userId, title, content) {
    return PostRepository.create({ userId, title, content });
  }

  async getPostsByUserId(userId, { cursor, pageSize }) {
    const posts = await PostRepository.findByUserId(userId, {
      cursor,
      limit: pageSize,
    });

    const hasMore = posts.length > pageSize;
    if (hasMore) {
      posts.pop(); // Remove the extra post used for checking next page
    }

    return {
      posts,
      nextCursor: hasMore ? posts[posts.length - 1].createdAt : null,
    };
  }
}

module.exports = new PostService();
