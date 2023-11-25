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
})

// update user validation schema
export const updateUserValidationSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  age: z.number().int().positive().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
})

// order validation schema
export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
})
