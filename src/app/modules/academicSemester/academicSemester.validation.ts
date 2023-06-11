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
    year: z.string({
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

//==============update semester validation security==========
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: 'Title is Required.....',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required.',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCods] as [string, ...string[]], {
          required_error: 'code is require..',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'StartMonth is Required..',
        })
        .optional(),

      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'endMonth is Required..',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message:
        'Either you can give two values title or code never change anothers one.. ',
    }
  );

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};

// await createUserZodSchema.parseAsync(req)
