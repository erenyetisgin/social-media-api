const UserRepository = require("../repositories/UserRepository");
const PostRepository = require("../repositories/PostRepository");

class UserService {
  async createUser(data) {
    // TODO: Check if user already exists
    return UserRepository.create(data);
  }

  async updateUser(userId, data) {
    const user = UserRepository.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.name = data.name || user.name;
    user.username = data.username || user.username;

    return UserRepository.update(userId, user);
  }

  async deleteUser(userId) {
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
