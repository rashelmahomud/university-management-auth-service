import { IPagenationOption } from '../../../interfaces/pagenations';
import { IGenericResponce } from '../../../interfaces/common';
import { PagenationHelpers } from '../../../helpers/pagenationHelpers';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFiltes } from './student.interface';
import { studentSharchAbleFields } from './student.constent';
import { Student } from './student.model';

//pagination work for this code
const getAllStudent = async (
  filters: IStudentFiltes, //search for this code
  pagenationOptions: IPagenationOption
): Promise<IGenericResponce<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  //search for this code =========
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: studentSharchAbleFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    PagenationHelpers.calculatepagenation(pagenationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereCondition);

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

//get single student code >
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
//get single semester=== ^

//====update student info ======>
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
//====update semeser ======^

//===========deleter semester code here...
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
//==========delete semester code here ====^

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
