const UserService = require("../../services/UserService");
const UserRepository = require("../../repositories/UserRepository");
const PostRepository = require("../../repositories/PostRepository");
const ApiError = require("../../errors/ApiError");

jest.mock("../../repositories/UserRepository");
jest.mock("../../repositories/PostRepository");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user successfully when username is unique", async () => {
      const userData = { username: "testuser", name: "Test User" };
      UserRepository.findByUsername.mockResolvedValue(null);
      UserRepository.create.mockResolvedValue(userData);

      const result = await UserService.createUser(userData);
      expect(result).toEqual(userData);
      expect(UserRepository.findByUsername).toHaveBeenCalledWith("testuser");
      expect(UserRepository.create).toHaveBeenCalledWith(userData);
    });

    it("should throw an api error if username already exists", async () => {
      UserRepository.findByUsername.mockResolvedValue({ username: "testuser" });

      await expect(
        UserService.createUser({ username: "testuser", name: "New User" })
      ).rejects.toThrow(ApiError);
      expect(UserRepository.findByUsername).toHaveBeenCalledWith("testuser");
    });
  });

  // Additional tests for updateUser, deleteUser, getUserById...
});
