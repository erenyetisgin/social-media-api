const PostService = require("../../services/PostService");
const UserRepository = require("../../repositories/UserRepository");
const PostRepository = require("../../repositories/PostRepository");
const ApiError = require("../../errors/ApiError");

jest.mock("../../repositories/PostRepository");
jest.mock("../../repositories/UserRepository");

describe("PostService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("should create a post successfully when user exists", async () => {
      const postData = {
        title: "Test Post",
        content: "This is a test post.",
        userId: 1,
      };

      const { userId, title, content } = postData;

      UserRepository.getUserById.mockResolvedValue({
        _id: userId,
        username: "testuser",
        name: "Test User",
      });
      PostRepository.create.mockResolvedValue(postData);

      const result = await PostService.createPost(userId, title, content);
      expect(result).toEqual(postData);
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(PostRepository.create).toHaveBeenCalledWith(postData);
    });

    it("should throw an api error when user does not exist", async () => {
      const postData = {
        title: "Test Post",
        content: "This is a test post.",
        userId: 1,
      };
      UserRepository.getUserById.mockResolvedValue(null);

      await expect(PostService.createPost(postData)).rejects.toThrow(ApiError);
      expect(UserRepository.getUserById).toHaveBeenCalledWith(1);
    });
  });

  describe("updatePost", () => {
    it("should update a post successfully", async () => {
      const postId = 1;
      const updatedData = {
        title: "Updated Post",
        content: "Updated content.",
      };
      PostRepository.getPostById.mockResolvedValue({
        _id: postId,
        title: "Old Title",
        content: "Old Content",
        userId: 1,
      });
      PostRepository.update.mockResolvedValue({ ...updatedData, _id: postId });

      const result = await PostService.updatePost(postId, updatedData);
      expect(result).toEqual({ ...updatedData, _id: postId });
      expect(PostRepository.getPostById).toHaveBeenCalledWith(postId);
      expect(PostRepository.update).toHaveBeenCalledWith(postId, updatedData);
    });

    it("should throw an api error if post does not exist for update", async () => {
      const postId = 1;
      PostRepository.getPostById.mockResolvedValue(null);

      await expect(
        PostService.updatePost(postId, { title: "New Title" })
      ).rejects.toThrow(ApiError);
      expect(PostRepository.getPostById).toHaveBeenCalledWith(postId);
    });
  });
});
