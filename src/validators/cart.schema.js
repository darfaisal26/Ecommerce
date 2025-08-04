const { z } = require("zod");

const addToCartSchema = z.object({
  product: z.string().length(24),
  variant: z.object({
    color: z.string().min(1),
    size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  }),
  quantity: z.number().int().positive().max(10),
});

module.exports = { addToCartSchema };
