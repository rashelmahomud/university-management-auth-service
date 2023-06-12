import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post('/', AcademicFacultyController.createFaculty);

router.get('/:id', AcademicFacultyController.getSingleFaculty);
// router.patch('/:id');

router.get('/', AcademicFacultyController.getAllSemesters);
// router.delete('/:id');

export const AcademicFacultyRoute = router;
