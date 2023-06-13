import { AcademicDepartmentController } from './academicDepartment.controller';
import express from 'express';

const router = express.Router();

router.post('/', AcademicDepartmentController.createDepartment);

export const AcademicDepartmentRoute = router;
