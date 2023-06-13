import { AcademicDepartmentController } from './academicDepartment.controller';
import express from 'express';

const router = express.Router();

router.post('/', AcademicDepartmentController.createDepartment);
router.get('/', AcademicDepartmentController.getAllDepartments);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch('/:id', AcademicDepartmentController.updateDepartment);

export const AcademicDepartmentRoute = router;
