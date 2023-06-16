import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/academec-semester',
    route: AcademicSemesterRoute,
  },

  //faculty====
  {
    path: '/academec-faculty',
    route: AcademicFacultyRoute,
  },
  //===========

  //academic department====
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  //===========
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/user', UserRoutes);
// router.use('/academec-semester', AcademicSemesterRoute);

export default router;
