const expressAsyncHandler = require("express-async-handler");
const productService = require("../services/product.services");

exports.create = expressAsyncHandler(async (req, res) => {
  let imagePath;

  if (req.file) {
    imagePath = `/uploads/products/${req.file.filename}`;
  } else if (req.body.image) {
    const img = req.body.image;
    try {
      new URL(img);
      imagePath = img;
    } catch {
      return res.status(400).json({ error: "Invalid image URL" });
    }
  }
  const productData = {
    ...req.body,
    image: imagePath,
  };

  const product = await productService.createProduct(productData);
  res.status(201).json({ product });
});

exports.update = expressAsyncHandler(async (req, res) => {
  // const image = req.file ? `/uploads/products/${req.file.filename}` : undefined;

  let imagePath;

  if (req.file) {
    imagePath = `/uploads/products/${req.file.filename}`;
  } else if (req.body.image) {
    const img = req.body.image;
    try {
      new URL(img);
      imagePath = img;
    } catch {
      return res.status(400).json({ error: "Invalid image URL" });
    }
  }
  const productData = {
    ...req.body,
    ...(image && { image: imagePath }),
  };

  const product = await productService.updateProduct(
    req.params.id,
    productData
  );
  res.json({ product });
});

exports.getOne = expressAsyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  console.log(product);
  res.json({ product });
});

exports.remove = expressAsyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).send();
});

exports.getAll = expressAsyncHandler(async (req, res) => {
  const {
    category,
    brand,
    sizes,
    minPrice,
    maxPrice,
    search,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const filter = {};

  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (sizes) filter.sizes = { $in: sizes.split(",") };

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [products, total] = await Promise.all([
    productService.filterProducts(filter, skip, limit, sort),
    productService.countProducts(filter),
  ]);

  // console.log(products, products.variants, total);

  res.json({
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    products,
  });
});
