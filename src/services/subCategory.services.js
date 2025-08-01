const SubCategory = require("../models/subcategory.model");
const AppError = require("../utils/appError");

exports.createSubCategory = async (data) => {
  const exists = await SubCategory.findOne({ slug: data.slug });
  if (exists) throw new AppError("Slug already exists", 409);
  return await SubCategory.create(data);
};

exports.getAllSubCategories = async () => {
  return await SubCategory.find().populate("category").lean();
};

exports.getSubCategoriesByCategoryId = async (categoryId) => {
  return await SubCategory.find({ category: categoryId }).lean();
};

exports.updateSubCategory = async (id, data) => {
  const updated = await SubCategory.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError("Subcategory not found", 404);
  return updated;
};

exports.deleteSubCategory = async (id) => {
  const deleted = await SubCategory.findByIdAndDelete(id);
  if (!deleted) throw new AppError("Subcategory not found", 404);
  return { message: "Subcategory deleted" };
};
