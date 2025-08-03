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

    it("should throw an api error when username already exists", async () => {
      UserRepository.findByUsername.mockResolvedValue({ username: "testuser" });

      await expect(
        UserService.createUser({ username: "testuser", name: "New User" })
      ).rejects.toThrow(ApiError);
      expect(UserRepository.findByUsername).toHaveBeenCalledWith("testuser");
    });
  });

  describe("updateUser", () => {
    it("should update a user successfully", async () => {
      const userId = 1;
      const updatedData = { name: "Updated User", username: "updateduser" };
      UserRepository.getUserById.mockResolvedValue({
        _id: userId,
        username: "testuser",
        name: "Test User",
      });
      UserRepository.update.mockResolvedValue({ ...updatedData, _id: userId });
      UserRepository.findByUsername.mockResolvedValue(null);

      const result = await UserService.updateUser(userId, updatedData);
      expect(result).toEqual({ ...updatedData, _id: userId });
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(UserRepository.update).toHaveBeenCalledWith(userId, {
        ...updatedData,
        _id: userId,
      });
    });

    it("should throw an api error if user does not exist for update", async () => {
      const userId = 1;
      UserRepository.getUserById.mockResolvedValue(null);

      await expect(
        UserService.updateUser(userId, {
          name: "New Name",
          username: "newuser",
        })
      ).rejects.toThrow(ApiError);
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
    });

    it("should throw an api error if username already exists during update", async () => {
      const userId = 1;
      UserRepository.getUserById.mockResolvedValue({
        _id: userId,
        username: "testuser",
        name: "Test User",
      });
      UserRepository.findByUsername.mockResolvedValue({
        username: "existinguser",
      });

      await expect(
        UserService.updateUser(userId, {
          name: "Updated User",
          username: "existinguser",
        })
      ).rejects.toThrow(ApiError);
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(UserRepository.findByUsername).toHaveBeenCalledWith(
        "existinguser"
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and their posts successfully", async () => {
      const userId = 1;
      UserRepository.getUserById.mockResolvedValue({ _id: userId });
      PostRepository.deleteAllByUserId.mockResolvedValue();
      UserRepository.delete.mockResolvedValue({ _id: userId });

      const result = await UserService.deleteUser(userId);
      expect(result).toEqual({ _id: userId });
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(PostRepository.deleteAllByUserId).toHaveBeenCalledWith(userId);
      expect(UserRepository.delete).toHaveBeenCalledWith(userId);
    });

    it("should throw an api error if user does not exist for deletion", async () => {
      const userId = 1;
      UserRepository.getUserById.mockResolvedValue(null);

      await expect(UserService.deleteUser(userId)).rejects.toThrow(ApiError);
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const userId = 1;
      const userData = { _id: userId, username: "testuser", name: "Test User" };
      UserRepository.getUserById.mockResolvedValue(userData);

      const result = await UserService.getUserById(userId);
      expect(result).toEqual(userData);
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
    });

    it("should return null if user does not exist", async () => {
      const userId = 1;
      UserRepository.getUserById.mockResolvedValue(null);

      const result = await UserService.getUserById(userId);
      expect(result).toBeNull();
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
    });
  });
});
