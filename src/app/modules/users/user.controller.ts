import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';

const createUser: RequestHandler = CatchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await userService.createUser(user);

    sendResponce(res, {
      //this code daynamically handel for have a sendResponce.ts file.
      statusCode: httpStatus.OK,
      success: true,
      message: 'create user in successfully done',
      data: result,
    });
    next();
  }
);
export const userController = {
  createUser,
};
