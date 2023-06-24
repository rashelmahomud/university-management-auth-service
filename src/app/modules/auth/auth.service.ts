import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { IUserLogin } from './auth.interface';
import bcrypt from 'bcrypt';

const userLogin = async (payload: IUserLogin) => {
  const { id, password } = payload;
  //check user exise
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dones not exise');
  }

  //metch user password
  const isPasswordMetchted = await bcrypt.compare(
    password,
    isUserExist?.password
  );
  if (!isPasswordMetchted) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incareet.');
  }

  return;
};

export const AuthService = {
  userLogin,
};
