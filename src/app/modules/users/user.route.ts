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
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  userController.createFaculy
);

router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  userController.createAdmin
);

export const UserRoutes = router;
