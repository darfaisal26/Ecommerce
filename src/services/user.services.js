const User = require("../models/user.model");
const AppError = require("../utils/appError");

exports.getAllUsers = async () => {
  const users = await User.find({ isActive: true }).select("-password"); // hide password field
  return users;
};

exports.toggleUserActiveStatus = async (userId, isActive) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isActive },
    { new: true, runValidators: true }
  );

  if (!user) throw new AppError("User not found", 404);
  return user;
};
