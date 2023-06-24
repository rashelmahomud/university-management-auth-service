import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  Secret: Secret,
  expireTime: string
) => {
  return jwt.sign(payload, Secret, {
    expiresIn: expireTime,
  });
};

export const jwtHelpers = {
  createToken,
};
