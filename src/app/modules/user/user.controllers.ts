import { Request, Response } from 'express'
import { UserServices } from './user.service'
import { userValidationSchema } from './user.validation'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}
