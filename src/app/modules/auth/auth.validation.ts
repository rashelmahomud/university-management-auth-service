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

export const AuthValidation = {
  loginZodSchema,
};
