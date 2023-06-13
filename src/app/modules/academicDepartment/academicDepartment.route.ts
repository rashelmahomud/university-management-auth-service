import { AcademicDepartmentController } from './academicDepartment.controller';
import express from 'express';

const router = express.Router();

router.post('/', AcademicDepartmentController.createDepartment);
router.get('/', AcademicDepartmentController.getAllDepartments);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

export const AcademicDepartmentRoute = router;
