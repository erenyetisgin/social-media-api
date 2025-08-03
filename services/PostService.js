const PostRepository = require("../repositories/PostRepository");
const UserRepository = require("../repositories/UserRepository");
const ApiError = require("../errors/ApiError");

class PostService {
  async createPost(userId, title, content) {
    // Check if the user exists
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return PostRepository.create({ userId, title, content });
  }

  async updatePost(postId, data) {
    const post = await PostRepository.getPostById(postId);
    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    post.title = data.title || post.title;
    post.content = data.content || post.content;

    return PostRepository.update(postId, post);
  }

  async deletePost(postId) {
    const post = await PostRepository.getPostById(postId);
    if (!post) {
      throw new ApiError(404, "Post not found");
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
