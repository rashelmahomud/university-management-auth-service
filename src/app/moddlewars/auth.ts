import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authoraization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authoraize');
      }
      //verfited token
      let verifydUser = null;
      verifydUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );

      req.user = verifydUser; // userId , role

      //role duard dawar jonno
      if (requiredRoles.length && !requiredRoles.includes(verifydUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden requrest');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
