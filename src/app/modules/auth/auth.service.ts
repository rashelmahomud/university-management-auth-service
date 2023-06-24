import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUserResponce, IUserLogin } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
const userLogin = async (payload: IUserLogin): Promise<ILoginUserResponce> => {
  const { id, password } = payload;
  //check user exise
  //   const user = new User();

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dones not exise');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMetchted(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incareet.');
  }

  // access token && reflesh token generate and setup
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expirest_id as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires as string
  );

  console.log({ accessToken, refreshToken, needsPasswordChange });

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  userLogin,
};
