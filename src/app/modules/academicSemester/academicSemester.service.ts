import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterSharchAbleFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constent';
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
  const { searchTerm, ...filtersData } = filters;

  //search for this code =========
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

  //=============================^

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
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

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicSemester.find(whereCondition)
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

//get single semester code >
const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
//get single semester=== ^

//====update semeser ======>
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalide semester code..');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
//====update semeser ======^

//===========deleter semester code here...
const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};
//==========delete semester code here ====^

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
