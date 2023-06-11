import { AcademicSemesterService } from './academicSemester.service';
import CatchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { pagenationFields } from '../../../conestent/pagenation';
import { academicSemesterFilterAbleFields } from './academicSemester.constent';

const createSemester = CatchAsync(
  //this file for try catch code have CatchAsync.ts file a
  async (req: Request, res: Response) => {
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
  }
);

//pagenation work for code>
const getAllSemesters = CatchAsync(async (req: Request, res: Response) => {
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
});
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

//===========update semeser data=======>
const updateSemester = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updateData);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester update done',
    data: result,
  });
  // next();
});

//========update semester data=========^

//======Deleter Semester code here =========>
const deleteSemester = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Delete.. done',
    data: result,
  });
});

//======Deleter Semester code here =========^

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
