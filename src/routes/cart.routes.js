const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware"); // middleware to get req.user
const validate = require("../middlewares/validate.middleware");
const { addToCartSchema } = require("../validators/cart.schema");

router.use(auth);

router.post("/", validate(addToCartSchema), cartController.addToCart);
router.get("/", cartController.getCart);
router.delete("/:id", cartController.removeFromCart);
router.delete("/:id", cartController.clearCart);

module.exports = router;
