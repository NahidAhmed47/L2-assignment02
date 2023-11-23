import { TUser } from './user.interface'
import { User } from './user.models'

const createUserToDB = async (user: TUser) => {
  const result = await User.create(user)
  return result
}

export const UserServices = {
  createUserToDB,
}
