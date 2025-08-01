const Category = require("../models/category.model");
const AppError = require("../utils/appError");

exports.createCategory = async (data) => {
  const exists = await Category.findOne({ slug: data.slug });
  if (exists) throw new AppError("Slug already exists", 409);
  return await Category.create(data);
};

exports.getAllCategories = async () => {
  return await Category.find().lean();
};

exports.getCategoryById = async (id) => {
  const cat = await Category.findById(id);
  if (!cat) throw new AppError("Category not found", 404);
  return cat;
};

exports.updateCategory = async (id, data) => {
  const updated = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError("Category not found", 404);
  return updated;
};

exports.deleteCategory = async (id) => {
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) throw new AppError("Category not found", 404);
  return { message: "Category deleted" };
};
