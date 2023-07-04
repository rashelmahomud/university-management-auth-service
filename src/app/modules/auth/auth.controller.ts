import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponce, IRefreshResponceToken } from './auth.interface';
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

const refreshToken = CatchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshTokenService(refreshToken);

  const cookeOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookeOptions);
  sendResponce<IRefreshResponceToken>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});

//change password =========>
const changePassword = CatchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(req.user);

  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(user, passwordData);
  sendResponce<ILoginUserResponce>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user password change successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
