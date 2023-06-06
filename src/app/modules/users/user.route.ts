import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../moddlewars/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.createUserZodSchema),
  userController.createUser
);

export const UserRoutes = router;
