const expressAsyncHandler = require("express-async-handler");
const authService = require("../services/auth.services");

exports.register = expressAsyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json({ user });
});

exports.login = expressAsyncHandler(async (req, res) => {
  const { token, user } = await authService.loginUser(req.body);
  res.json({ token, user });
});
