import { Schema, model } from 'mongoose';

import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

///this is a user model
const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// academicSemesterSchema.pre('save', async function (next) {
//   const isExist = await AcademicSemester.findOne({
//     title: this.title,
//     year: this.year,
//   });
//   if (isExist) {
//     throw new ApiError(
//       status.CONFLICT,
//       'Academic Semester is already exsist..'
//     );
//   }
//   next();
// });

// export default academicSemesterSchema;

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
