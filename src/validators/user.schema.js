const { z } = require("zod");
const toggleUserSchema = z.object({
  userId: z.string().min(1),
  isActive: z.boolean(),
});

module.exports = toggleUserSchema;
