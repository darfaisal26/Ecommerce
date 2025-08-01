const Product = require("../models/product.model");
const AppError = require("../utils/appError");

exports.createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

exports.updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

exports.filterProducts = async (filter, skip, limit, sort) => {
  return await Product.find(filter)
    .populate("category")
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
};

exports.countProducts = async (filter) => {
  return await Product.countDocuments(filter);
};
