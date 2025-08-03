const UserService = require("../services/UserService");
const ApiError = require("../errors/ApiError");

exports.createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await UserService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await UserService.updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
