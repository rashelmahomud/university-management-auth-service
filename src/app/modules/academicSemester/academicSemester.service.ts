import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constent';
import {
  IAcademicSemester,
  IAcademicSemesterFiltes,
} from './academicSemester.interface';
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
  filters: IAcademicSemesterFiltes, //search for this code
  pagenationOptions: IPagenationOption
): Promise<IGenericResponce<IAcademicSemester[]>> => {
  const { searchTerm } = filters;

  //search for this code =========
  const academicSemesterSharchAbleFields = ['title', 'code', 'year'];
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSharchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];
  //============================^

  const { page, limit, skip, sortBy, sortOrder } =
    PagenationHelpers.calculatepagenation(pagenationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andCondition })
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
