import { z } from 'zod'

export const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'User Id is required',
  }).int().positive(),
  username: z.string({
    required_error: 'Username is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  fullName: z.object({
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
  }),
  age: z.number({
    required_error: 'Age is required'
  }).int().positive(),
  email: z.string({
    required_error: 'Email is required',
  }).email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string({
    required_error: 'Hobbies are required',
  })),
  address: z.object({
    street: z.string({
      required_error: 'Street is required',
    }),
    city: z.string({
      required_error: 'City is required',
    }),
    country: z.string({
      required_error: 'Country is required',
    }),
  }),
  orders: z
    .array(
      z.object({
        productName: z.string({
          required_error: 'Product name is required',
        }),
        price: z.number({
          required_error: 'Price is required',
        }).positive(),
        quantity: z.number({
          required_error: 'Quantity is required',
        }).int().positive(),
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
  productName: z.string({
    required_error: 'Product name is required',
  }),
  price: z.number({
    required_error: 'Price is required',
  }).positive(),
  quantity: z.number({
    required_error: 'Quantity is required',
  }).int().positive(),
})
