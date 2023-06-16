import CatchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponce from '../../../shared/sendResponce';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { pagenationFields } from '../../../conestent/pagenation';
import { StudentService } from './student.service';
import { studentFilterAbleFields } from './student.constent';

//pagenation work for code>
const getAllStudent = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterAbleFields); //search for this code
  const pagenationOptions = pick(req.query, pagenationFields);

  const result = await StudentService.getAllStudent(filters, pagenationOptions);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Student in successfully done',
    meta: result.meta,
    data: result.data,
  });
});
//pagenation work for code ^

///single data get =================>
const getSingleStudent = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

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
const updateUpdate = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudent(id, updateData);

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
const deleteStudent = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Delete.. done',
    data: result,
  });
});

//======Deleter Semester code here =========^

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateUpdate,
  deleteStudent,
};
