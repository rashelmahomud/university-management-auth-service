import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required.',
    }),
    password: z.string({
      required_error: 'required password',
    }),
  }),
});

//refresh token validations
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required.',
    }),
  }),
});
//change password
const chnagePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old password is required.',
    }),
    newPassword: z.string({
      required_error: 'new password is required.',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  chnagePasswordZodSchema,
};
