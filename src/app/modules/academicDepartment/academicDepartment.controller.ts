import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CatchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponce';
import { AcademicDepartmentService } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { academicDeartmentFilterAbleFields } from './academicDepartment.constent';
import { pagenationFields } from '../../../conestent/pagenation';

//==============create deparment data ===============>
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
//==============create deparment data ===============^

//==========get department all data ================>
const getAllDepartments = CatchAsync(async (req: Request, res: Response) => {
  //get all data
  const filters = pick(req.query, academicDeartmentFilterAbleFields); //search for this code
  const pagenationOptions = pick(req.query, pagenationFields);

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    pagenationOptions
  );

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create department in successfully Get',
    meta: result.meta,
    data: result.data,
  });
});
//==========get department all data ================^

//==========get department single data ================>
const getSingleDepartment = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create department in successfully Get',
    data: result,
  });
});
//==========get department single data ================^

//====database update from database ========>
const updateDepartment = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updateData
  );

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully update data',
    data: result,
  });
});
//====database update from database ========^

//==== delete data from database depertment ===========>
const deleteDevelopment = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDevelopment(id);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data deleted succesfully from database',
    data: result,
  });
});

//==== delete data from database depertment ===========^

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDevelopment,
};
