const User = require("../models/User");

class UserRepository {
  async create(data) {
    User.create(data);
  }

  async update(userId, data) {
    return User.findByIdAndUpdate(userId, data, { new: true });
  }

  async delete(userId) {
    return User.findByIdAndDelete(userId);
  }

  async getUserById(userId) {
    return User.findById(userId);
  }
}

module.exports = new UserRepository();
