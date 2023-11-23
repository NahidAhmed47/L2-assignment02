import { Schema, model } from "mongoose";
import { TAddress, TOrder, TUser } from "./user.interface";


const addressSchema = new Schema<TAddress>({
    street: { type: String, required: [true, "Street is required"] },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },

})

const orderSchema = new Schema<TOrder>({
    productName: { type: String, required: [true, "Product name is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
})

const userSchema = new Schema<TUser>({
    userId: { type: Number, required: [true, "Id is required"], unique: true },
    username: { type: String, required: [true, "Name is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
    fullName: {
        firstName: { type: String, required: [true, "First name is required"] },
        lastName: { type: String, required: [true, "Last name is required"] }
    },
    age: { type: Number, required: [true, "Age is required"] },
    email: { type: String, required: [true, "Email is required"] },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: { type: [String], required: [true, "Hobbies are required"] },
    address: { type: addressSchema, required: [true, "Address is required"] },
    orders: [orderSchema],
})

export const User = model<TUser>("User", userSchema);

