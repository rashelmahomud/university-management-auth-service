import { Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';

const createStudent: RequestHandler = CatchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);

    sendResponce(res, {
      //this code daynamically handel for have a sendResponce.ts file.
      statusCode: httpStatus.OK,
      success: true,
      message: 'create user in successfully done',
      data: result,
    });
  }
);
export const userController = {
  createStudent,
};
