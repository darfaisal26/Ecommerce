const asyncHandler = require("express-async-handler");
const subCategoryService = require("../services/subcategory.service");

exports.create = asyncHandler(async (req, res) => {
  const subcategory = await subCategoryService.createSubCategory(req.body);
  res.status(201).json({ success: true, subcategory });
});

exports.getAll = asyncHandler(async (req, res) => {
  const subcategories = await subCategoryService.getAllSubCategories();
  res.json({ success: true, subcategories });
});

exports.getByCategory = asyncHandler(async (req, res) => {
  const subs = await subCategoryService.getSubCategoriesByCategoryId(
    req.params.categoryId
  );
  res.json({ success: true, subcategories: subs });
});

exports.update = asyncHandler(async (req, res) => {
  const subcategory = await subCategoryService.updateSubCategory(
    req.params.id,
    req.body
  );
  res.json({ success: true, subcategory });
});

exports.remove = asyncHandler(async (req, res) => {
  const result = await subCategoryService.deleteSubCategory(req.params.id);
  res.json({ success: true, ...result });
});
