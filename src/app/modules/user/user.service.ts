import { TOrder, TUser } from './user.interface'
import { User } from './user.model'

// create user to database
const createUserToDB = async (user: TUser) => {
  const createdUser = await User.create(user)
  const result = await User.findOne({ _id: createdUser._id }).select(
    '-orders -password -__v -_id -createdAt -updatedAt',
  )
  return result
}

// get all user from database
const getAllUsersFromDB = async () => {
  const result = await User.find({}, 'username fullName age email address -_id')
  return result
}

// get single user by userId
const getSingleUserByUserId = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne(
      { userId },
      '-orders -password -__v -_id -createdAt -updatedAt',
    )
    return result
  } else {
    throw {
      error: {
        code: 404,
        description: 'User nor found!',
      },
    }
  }
}

// delete user by userId
const deleteUserByUserId = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId })
    return result
  } else {
    throw {
      error: {
        code: 404,
        description: 'User nor found!',
      },
    }
  }
}

// update user data
const updateUserByUserId = async (userId: number, user: TUser) => {
  if (await User.isUserExists(userId)) {
    const existsData = (await User.findOne({ userId })) as TUser
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        $set: {
          username: user?.username || existsData.username,
          'fullName.firstName':
            user?.fullName?.firstName || existsData.fullName.firstName,
          'fullName.lastName':
            user?.fullName?.lastName || existsData.fullName.lastName,
          age: user?.age || existsData.age,
          email: user?.email || existsData.email,
          'address.street': user?.address?.street || existsData.address.street,
          'address.city': user?.address?.city || existsData.address.city,
          'address.country':
            user?.address?.country || existsData.address.country,
        },
        $push: {
          hobbies: { $each: user?.hobbies || [] },
        },
      },
      {
        new: true,
        runValidators: true,
        select: '-orders -password -__v -_id -createdAt -updatedAt',
      },
    )

    return updatedUser
  } else {
    throw {
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  }
}

// create new order and push to user
const createNewOrderToDB = async (userId: number, order: TOrder) => {
  if (await User.isUserExists(userId)) {
    const newOrder = await User.updateOne(
      { userId },
      {
        $push: {
          orders: order,
        },
      },
    )
    return newOrder
  } else {
    throw {
      error: {
        code: 404,
        description: 'User nor found!',
      },
    }
  }
}

// Retrieve all orders for a specific user

const getAllOrdersByUserIdFormDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }, 'orders -_id')
    return result
  } else {
    throw {
      error: {
        code: 404,
        description: 'User nor found!',
      },
    }
  }
}

// calculate total price of all orders for a specific user
const calculateTotalPriceOfAllOrdersByUserIdFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: {
              $multiply: ['$orders.price', '$orders.quantity'],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          totalPrice: {
            $round: ['$totalPrice', 2],
          },
        },
      },
    ])
    return result[0]
  } else {
    throw {
      error: {
        code: 404,
        description: 'User nor found!',
      },
    }
  }
}

export const UserServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserByUserId,
  deleteUserByUserId,
  updateUserByUserId,
  createNewOrderToDB,
  getAllOrdersByUserIdFormDB,
  calculateTotalPriceOfAllOrdersByUserIdFromDB,
}
