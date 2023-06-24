import { Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudent: RequestHandler = CatchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);

    sendResponce(res, {
      //this code daynamically handel for have a sendResponce.ts file.
      statusCode: httpStatus.OK,
      success: true,
      message: 'create Student in successfully done',
      data: result,
    });
  }
);

const createFaculy: RequestHandler = CatchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await userService.createFaculty(faculty, userData);

    sendResponce<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = CatchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await userService.createAdmin(admin, userData);

    sendResponce<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);
export const userController = {
  createStudent,
  createAdmin,
  createFaculy,
};
