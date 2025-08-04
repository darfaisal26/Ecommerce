const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createProductSchema,
  updateProductSchema,
  updateRatingSchema,
} = require("../validators/product.schema");

const upload = require("../middlewares/upload.middleware");

router.post(
  "/",
  upload.single("image"),
  validate(createProductSchema),
  productController.create
);

router.put(
  "/:id",
  upload.single("image"),
  validate(updateProductSchema),
  productController.update
);

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.delete("/:id", productController.remove);
router.post(
  "/rate",
  validate(updateRatingSchema),
  productController.updateProductRating
);

module.exports = router;
