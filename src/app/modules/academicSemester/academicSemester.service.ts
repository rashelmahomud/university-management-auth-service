import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constent';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemesterModel';
import { IPagenationOption } from '../../../interfaces/pagenations';
import { IGenericResponce } from '../../../interfaces/common';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalide semester code..');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

//pagination work for this code
const getAllSemesters = async (
  pagenationOptions: IPagenationOption
): Promise<IGenericResponce<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = pagenationOptions;
  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//pagenation work for code ^

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
