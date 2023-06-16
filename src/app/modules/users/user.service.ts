import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genarateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // const id = await generateFacultyId();
  // user.id = id;

  // defoult pass set
  if (!user.password) {
    user.password = config.student_default_password as string;
  }

  // set role

  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  /// genarate student ID

  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await genarateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to created student');
    }

    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to created user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();

    session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;

  // const createdUser = await User.create(user);
  // if (!createdUser) {
  //   throw new ApiError(400, 'faild to error');
  // }
  // return createdUser;
};

export const userService = {
  createStudent,
};
