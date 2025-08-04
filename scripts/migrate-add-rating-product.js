const Product = require("../src/models/product.model");
const connectDB = require("../src/config/db");

async function updateExistingRatings() {
  await connectDB();
  const result = await Product.updateMany(
    { rating: { $exists: false } },
    { $set: { rating: { average: 0, count: 0 } } }
  );

  console.log("Updated products:", result.modifiedCount);
  process.exit(0);
}

updateExistingRatings();
