import express from 'express';
import validateRequest from '../../moddlewars/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema)
  //   userController.createUser
);

export const UserRoutes = router;
