import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const result = await UserServices.createUserToDB(userData)
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

export const UserControllers = {
  createUser,
}
