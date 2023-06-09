import { AcademicSemesterService } from './academicSemester.service';
import CatchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';

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

export const AcademicSemesterController = {
  createSemester,
};
