import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import { AcademicDepartmentService } from './academicDepartment.service';

const createDepartment = CatchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentData
    );

    sendResponce(res, {
      //this code daynamically handel for have a sendResponce.ts file.
      statusCode: httpStatus.OK,
      success: true,
      message: 'create Department in successfully done',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createDepartment,
};
