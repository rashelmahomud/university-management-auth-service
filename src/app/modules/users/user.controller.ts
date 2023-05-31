import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      massage: 'database seccessfully done',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      massage: 'database faild',
    })
  }
}
export default {
  createUser,
}
