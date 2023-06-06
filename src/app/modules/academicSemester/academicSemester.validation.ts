import { z } from 'zod';
import {
  academicSemesterCods,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constent';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is Required.....',
    }),
    year: z.number({
      required_error: 'year is required.',
    }),
    code: z.enum([...academicSemesterCods] as [string, ...string[]], {
      required_error: 'code is require..',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'StartMonth is Required..',
    }),

    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'endMonth is Required..',
    }),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
};

// await createUserZodSchema.parseAsync(req)
