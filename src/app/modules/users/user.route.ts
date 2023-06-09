import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../moddlewars/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createUserZodSchema),
  userController.createStudent
);

export const UserRoutes = router;
