const { z } = require("zod");

const baseCategorySchema = {
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),
  status: z.enum(["active", "inactive"]).default("active"),
};

const createCategorySchema = z.object(baseCategorySchema);
const updateCategorySchema = z.object(baseCategorySchema).partial();

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
