const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validators/category.schema");

router.post("/", validate(createCategorySchema), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", validate(updateCategorySchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
