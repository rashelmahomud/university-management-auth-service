import { AcademicDepartmentController } from './academicDepartment.controller';
import express from 'express';

const router = express.Router();

router.post('/', AcademicDepartmentController.createDepartment);
router.get('/', AcademicDepartmentController.getAllDepartments);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch('/:id', AcademicDepartmentController.updateDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDevelopment);
export const AcademicDepartmentRoute = router;
