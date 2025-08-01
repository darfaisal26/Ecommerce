const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { registerSchema, loginSchema } = require("../validators/auth.schema");
const validate = require("../middlewares/validate.middleware");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
