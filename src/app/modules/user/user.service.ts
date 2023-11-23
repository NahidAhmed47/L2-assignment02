import { TUser } from './user.interface'
import { User } from './user.model'

// create user to databse
const createUserToDB = async (user: TUser) => {
  const result = await User.create(user)
  return result
}

// get all user from database
const getAllUsersFromDB = async () => {
  const result = await User.find({}, 'username fullName age email address')
  return result
}

// get single user by userId
const getSingleUserByUserId = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }, '-orders -password')
    return result
  } else {
    throw new Error('User not found')
  }
}

export const UserServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserByUserId,
}
