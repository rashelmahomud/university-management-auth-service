import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../moddlewars/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../moddlewars/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getSingleFaculty
);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.updateFaculy
);

router.get('/', AcademicFacultyController.getAllFaculty);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFaculy
);

export const AcademicFacultyRoute = router;
