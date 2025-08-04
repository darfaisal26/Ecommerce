const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { type: String },
    isActive: { type: Boolean, default: true },
    image: { type: String }, // primary product image
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    variants: [
      {
        color: { type: String, required: true },
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL"],
          required: true,
        },
        sku: { type: String, required: true },
        stock: { type: Number, default: 0 },
        price: { type: Number, required: true },
        image: { type: String }, // optional variant image
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
