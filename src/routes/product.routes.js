const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createProductSchema,
  updateProductSchema,
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

module.exports = router;
