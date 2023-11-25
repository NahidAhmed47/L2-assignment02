import { z } from 'zod'

export const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z
    .array(
      z.object({
        productName: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .optional(),
  isDeleted: z.boolean().optional().default(false),
})

// order validation schema
export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
})
