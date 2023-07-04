import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  IChangePasswod,
  ILoginUserResponce,
  IRefreshResponceToken,
  IUserLogin,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import bcrypt from 'bcrypt';
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
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshTokenService = async (
  token: string
): Promise<IRefreshResponceToken> => {
  let verifyedToken;
  try {
    verifyedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
  } catch (error) {
    //error handel here
    throw new ApiError(httpStatus.FORBIDDEN, 'invalide refreshToken');
  }

  const { userId } = verifyedToken;

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not working');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expirest_id as string
  );

  return {
    accessToken: newAccessToken,
  };
};

// chage password setup seting..................>

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePasswod
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  ///check user
  const isUserExist = await User.isUserExist(user?.userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not here..');
  }
  //check old password

  if (
    isUserExist.password &&
    !(await User.isPasswordMetchted(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password  is incareet.');
  }

  //hash password;;
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );

  const query = { id: user?.userId };
  const updateData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChnageAt: new Date(),
  };

  //update password
  await User.findOneAndUpdate(query, updateData);
};
// chage password setup seting..................^

export const AuthService = {
  userLogin,
  refreshTokenService,
  changePassword,
};
