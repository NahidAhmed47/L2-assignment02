import { TUser } from './user.interface'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { UserServices } from './user.service'
import {
  orderValidationSchema,
  updateUserValidationSchema,
  userValidationSchema,
} from './user.validation'

// create user to databse
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const zodParsedData = userValidationSchema.parse(userData)
    const result = await UserServices.createUserToDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

// get all user from database
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

// get single user by userId
const getSingleUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserByUserId(Number(userId))
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

// delete user by userId
const deleteUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserByUserId(Number(userId))
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result && null,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

// update user data
const updateUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params
    const { user } = req.body

    const zodParsedDataForUpdate = updateUserValidationSchema.parse(user)

    const result = await UserServices.updateUserByUserId(
      Number(id),
      zodParsedDataForUpdate as TUser,
    )

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    })
  } catch (err: any) {
    if (err.errors) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.errors,
      })
    } else {
      // Handle other types of errors
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      })
    }
  }
}

// create new order and push to user
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { order } = req.body
    const zodParsedData = orderValidationSchema.parse(order)
    const result = await UserServices.createNewOrderToDB(
      Number(userId),
      zodParsedData,
    )
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result && null,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

// Retrieve all orders for a specific user
const getAllOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getAllOrdersByUserIdFormDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'All orders retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

// calculate total price of all orders for a specific user
const calculateTotalPriceOfAllOrdersByUserId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params
    const result =
      await UserServices.calculateTotalPriceOfAllOrdersByUserIdFromDB(
        Number(userId),
      )
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUserByUserId,
  deleteUserByUserId,
  updateUserByUserId,
  createNewOrder,
  getAllOrdersByUserId,
  calculateTotalPriceOfAllOrdersByUserId,
}
