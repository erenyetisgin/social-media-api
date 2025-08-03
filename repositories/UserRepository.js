const ApiError = require("../errors/ApiError");
const User = require("../models/User");

class UserRepository {
  async create(data) {
    try {
      User.create(data);
    } catch (error) {
      // Duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        throw new ApiError(409, `Duplicate value for field: ${field}`);
      }

      throw error; // Re-throw other errors
    }
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

  async findByUsername(username) {
    return User.find({ username });
  }
}

module.exports = new UserRepository();
