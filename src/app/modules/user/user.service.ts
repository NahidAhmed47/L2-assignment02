import { TUser } from './user.interface'
import { User } from './user.model'

// create user to database
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

// delete user by userId
const deleteUserByUserId = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId })
    return result
  } else {
    throw new Error('User not found')
  }
}

// update user data
const updateUserByUserId = async (userId: number, user: TUser) => {
  if (await User.isUserExists(userId)) {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $set: user },
      { new: true, runValidators: true },
    )
    return updatedUser
  } else {
    throw new Error('User not found')
  }
}

//push new order id to user
// await UserModel.updateOne({ _id: req.body.userId }, {
//     $push: {
//         ordersId: newOrder._id
//     }
// })

export const UserServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserByUserId,
  deleteUserByUserId,
  updateUserByUserId,
}
