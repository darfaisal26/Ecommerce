const { z } = require('zod');

const allowedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const createProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().length(24, 'Category must be a valid MongoDB ID'),
  brand: z.string().optional(),
  sizes: z
    .array(z.enum(allowedSizes), {
      required_error: 'Sizes must be an array of valid size values',
    })
    .optional(),
  stock: z.number().int().nonnegative().optional(),
  image: z.string().url('Image must be a valid URL').optional(), // if uploading externally
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const updateProductSchema = createProductSchema.partial(); // For PATCH or PUT

module.exports = {
  createProductSchema,
  updateProductSchema,
};
