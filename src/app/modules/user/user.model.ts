import { Schema, model } from 'mongoose'
import { TAddress, TOrder, TUser, UserModel } from './user.interface'
import { config } from '../../config'
import bcrypt from 'bcrypt'

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
})

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
})

const userSchema = new Schema<TUser>(
  {
    userId: { type: Number, required: [true, 'Id is required'], unique: true },
    username: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    fullName: {
      firstName: { type: String, required: [true, 'First name is required'] },
      lastName: { type: String, required: [true, 'Last name is required'] },
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: { type: [String], required: [true, 'Hobbies are required'] },
    address: { type: addressSchema, required: [true, 'Address is required'] },
    orders: [orderSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// password hashing
userSchema.pre('save', async function (next) {
  const user = this as TUser
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// Exclude password field from the response
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  // Exclude the "password" field
  delete userObject.password
  return userObject
}

// Query Middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// static method to check is user exists
userSchema.statics.isUserExists = async function (userId: number) {
  const user = await User.findOne({ userId })
  return user
}

export const User = model<TUser, UserModel>('User', userSchema)
