import CatchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponce from '../../../shared/sendResponce';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { academicFacultyFilterAbleFields } from './academicFaculty.constent';
import { pagenationFields } from '../../../conestent/pagenation';

const createFaculty = CatchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await AcademicFacultyService.createFaculty(
      academicFacultyData
    );

    sendResponce(res, {
      //this code daynamically handel for have a sendResponce.ts file.
      statusCode: httpStatus.OK,
      success: true,
      message: 'create Faculty in successfully done',
      data: result,
    });
  }
);

//pagenation work for code>
const getAllSemesters = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterAbleFields); //search for this code
  const pagenationOptions = pick(req.query, pagenationFields);

  const result = await AcademicFacultyService.getAllFacultes(
    filters,
    pagenationOptions
  );

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Faculty in successfully done',
    meta: result.meta,
    data: result.data,
  });
});
//pagenation work for code ^

export const AcademicFacultyController = {
  createFaculty,
  getAllSemesters,
};
