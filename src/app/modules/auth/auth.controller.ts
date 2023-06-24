import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponce } from './auth.interface';
import config from '../../../config';

const loginUser = CatchAsync(async (req: Request, res: Response) => {
  const { ...userDaata } = req.body;
  const result = await AuthService.userLogin(userDaata);
  const { refreshToken, ...others } = result;

  const cookeOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookeOptions);

  // delete result.refreshToken;

  sendResponce<ILoginUserResponce>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
