const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const toggleUserSchema = require("../validators/user.schema");
const validate = require("../middlewares/validate.middleware");

router.get("/", userController.getUsers);
router.post(
  "/changeStatus",
  validate(toggleUserSchema),
  userController.setUserActiveStatus
);

module.exports = router;
