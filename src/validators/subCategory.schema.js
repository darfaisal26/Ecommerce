const { z } = require("zod");

const baseSubCategorySchema = {
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),
  status: z.enum(["active", "inactive"]).default("active"),
  category: z.string().min(24, "Valid category ObjectId required"),
};

const createSubCategorySchema = z.object(baseSubCategorySchema);
const updateSubCategorySchema = z.object(baseSubCategorySchema).partial();

module.exports = {
  createSubCategorySchema,
  updateSubCategorySchema,
};
