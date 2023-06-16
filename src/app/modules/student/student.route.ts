import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../moddlewars/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  StudentController.updateUpdate
);

router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
