import config from '../../../config'
import ApiError from '../../../errors/apierror'
import { IUser } from './user.interface'
import { User } from './user.model'
import { genarateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await genarateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.student_default_password as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'faild to error')
  }
  return createdUser
}

export const userService = {
  createUser,
}
