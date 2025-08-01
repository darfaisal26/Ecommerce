const express = require("express");
const router = express.Router();
const controller = require("../controllers/subcategory.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createSubCategorySchema,
  updateSubCategorySchema,
} = require("../validators/subcategory.schema");

router.post("/", validate(createSubCategorySchema), controller.create);
router.get("/", controller.getAll);
router.get("/by-category/:categoryId", controller.getByCategory);
router.put("/:id", validate(updateSubCategorySchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
