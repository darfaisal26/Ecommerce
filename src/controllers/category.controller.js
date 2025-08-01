const asyncHandler = require("express-async-handler");
const categoryService = require("../services/category.services");

exports.create = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({ success: true, category });
});

exports.getAll = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json({ success: true, categories });
});

exports.getOne = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.json({ success: true, category });
});

exports.update = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body
  );
  res.json({ success: true, category });
});

exports.remove = asyncHandler(async (req, res) => {
  const result = await categoryService.deleteCategory(req.params.id);
  res.json({ success: true, ...result });
});
