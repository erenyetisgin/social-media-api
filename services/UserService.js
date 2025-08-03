const UserRepository = require("../repositories/UserRepository");
const PostRepository = require("../repositories/PostRepository");
const ApiError = require("../errors/ApiError");

class UserService {
  async createUser(data) {
    if (await UserRepository.findByUsername(data.username)) {
      throw new ApiError(409, "Username already exists");
    }

    return UserRepository.create(data);
  }

  async updateUser(userId, data) {
    const user = UserRepository.getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.name = data.name || user.name;
    user.username = data.username || user.username;

    return UserRepository.update(userId, user);
  }

  async deleteUser(userId) {
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // First, delete all posts by the user
    await PostRepository.deleteAllByUserId(userId);

    // Now delete the user
    return UserRepository.delete(userId);
  }

  async getUserById(userId) {
    return UserRepository.getUserById(userId);
  }
}

module.exports = new UserService();
