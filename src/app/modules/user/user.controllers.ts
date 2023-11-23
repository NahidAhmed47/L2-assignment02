/* eslint-disable @typescript-eslint/no-explicit-any */
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

// update user data
const updateUserByUserId = async (req: Request, res: Response) => {
    try {
        // const { userId } = req.params;
        // const { user } = req.body;
        // const zodParsedData = userUpdateValidationSchema.parse(user);
        //     const result = await UserServices.updateUserByUserId(Number(userId), user);
        //     res.status(200).json({
        //         success: true,
        //         message: 'User updated successfully',
        //         data: result,
        // })
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
    updateUserByUserId
}
