import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post('/', AcademicFacultyController.createFaculty);

// router.get('/:id');
// router.patch('/:id');

// router.get('/');
// router.delete('/:id');

export const AcademicFacultyRoute = router;
