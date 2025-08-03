const PostRepository = require("../repositories/PostRepository");
const ApiError = require("../errors/ApiError");

class PostService {
  async createPost(userId, title, content) {
    return PostRepository.create({ userId, title, content });
  }

  async updatePost(postId, data) {
    const post = await PostRepository.getPostById(postId);
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    return PostRepository.update(postId, data);
  }

  async deletePost(postId) {
    const post = await PostRepository.getPostById(postId);
    if (!post) {
      throw new ApiError("Post not found");
    }
    return PostRepository.delete(postId);
  }

  async getPostById(postId) {
    return PostRepository.getPostById(postId);
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
