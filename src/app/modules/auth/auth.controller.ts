import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const loginUser = CatchAsync(async (req: Request, res: Response) => {
  const { ...userDaata } = req.body;
  const result = await AuthService.userLogin(userDaata);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
