import { RequestHandler } from 'express';
import { userService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await userService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'database seccessfully done',
      data: result,
    });
  } catch (err) {
    // res.status(400).json({
    //   error: err,
    // })
    next(err);
  }
};
export const userController = {
  createUser,
};
