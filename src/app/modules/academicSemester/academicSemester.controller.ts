import { AcademicSemesterService } from './academicSemester.service';
import CatchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { pagenationFields } from '../../../conestent/pagenation';
import { academicSemesterFilterAbleFields } from './academicSemester.constent';

const createSemester = CatchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponce(res, {
      //this code daynamically handel for have a sendResponce.ts file.
      statusCode: httpStatus.OK,
      success: true,
      message: 'create semester in successfully done',
      data: result,
    });
    next();
  }
);

//pagenation work for code>
const getAllSemesters = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterAbleFields); //search for this code
    const pagenationOptions = pick(req.query, pagenationFields);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      pagenationOptions
    );

    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'create semester in successfully done',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);
//pagenation work for code ^

///single data get =================>
const getSingleSemester = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrative done',
    data: result,
  });
  // next();
});

//===============^

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
