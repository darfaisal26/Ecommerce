const expressAsyncHandler = require("express-async-handler");
const userService = require("../services/user.services");

exports.getUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await userService.getAllUsers();
  const count = users.length;
  res.json({ users, count });
});

exports.setUserActiveStatus = expressAsyncHandler(async (req, res) => {
  const { isActive, userId } = req.body;

  console.log(isActive, userId);

  const updatedUser = await userService.toggleUserActiveStatus(
    userId,
    isActive
  );

  const { name, email, isActive: status } = updatedUser;
  res.status(200).json({
    message: `User ${isActive ? "activated" : "deactivated"} successfully`,
    user: {
      name,
      email,
      status,
    },
  });
});
