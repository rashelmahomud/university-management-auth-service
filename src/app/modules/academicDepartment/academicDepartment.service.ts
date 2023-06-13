import { IAcademicDeartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
// import { academicFacultySharchAbleFields } from './academicFaculty.constent';

//==========post data ======>
const createDepartment = async (
  payload: IAcademicDeartment
): Promise<IAcademicDeartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

//===========post department data create ===^

export const AcademicDepartmentService = {
  createDepartment,
};
