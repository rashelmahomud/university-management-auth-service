import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../moddlewars/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculy
);

router.get('/', AcademicFacultyController.getAllSemesters);
router.delete('/:id', AcademicFacultyController.deleteFaculy);

export const AcademicFacultyRoute = router;
