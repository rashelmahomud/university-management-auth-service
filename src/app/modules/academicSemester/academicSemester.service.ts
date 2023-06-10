import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constent';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemesterModel';
import { IPagenationOption } from '../../../interfaces/pagenations';
import { IGenericResponce } from '../../../interfaces/common';
import { PagenationHelpers } from '../../../helpers/pagenationHelpers';
import { SortOrder } from 'mongoose';

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
  const { page, limit, skip, sortBy, sortOrder } =
    PagenationHelpers.calculatepagenation(pagenationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

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
