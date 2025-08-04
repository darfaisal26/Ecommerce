const { z } = require("zod");

const allowedSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().length(24, "Category must be a valid MongoDB ID"),
  brand: z.string().optional(),
  sizes: z
    .array(z.enum(allowedSizes), {
      required_error: "Sizes must be an array of valid size values",
    })
    .optional(),
  stock: z.number().int().nonnegative().optional(),
  image: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .refine(
      (url) => !url || /\.(jpg|jpeg|png|webp|gif|avif|svg)(\?.*)?$/.test(url),
      {
        message: "Image URL must point to a valid image file",
      }
    )
    .refine((url) => !url || z.string().url().safeParse(url).success, {
      message: "Image must be a valid URL",
    }),

  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(
    z.object({
      color: z.string().min(1),
      size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
      sku: z.string().min(1),
      stock: z.coerce.number().nonnegative(), // allows "50" or 50
      price: z.coerce.number().nonnegative(),
      image: z.string().optional(),
    })
  ),
});

const updateProductSchema = createProductSchema.partial(); // For PATCH or PUT

const updateRatingSchema = z.object({
  productId: z.string().length(24, "Invalid product ID"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  updateRatingSchema,
};
