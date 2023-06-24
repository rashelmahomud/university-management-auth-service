import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/user', UserRoutes);
// router.use('/academec-semester', AcademicSemesterRoute);

export default router;
