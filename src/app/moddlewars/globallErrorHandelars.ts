/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handelValidationError from '../../errors/handelValidationError';
import { errorlogger } from '../../shared/logger';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';
import handelZodError from '../../errors/handelZodError';
import handelCastError from '../../errors/handelCastError';

const globallErrorHandelars: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('~~~globalErrorHandeler ~~', error)
    : errorlogger.error('~~~globalErrorHandeler ~~', error);

  let statusCode = 500;
  let message = 'Something want wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simpliedError = handelValidationError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorMessages = simpliedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simpliedError = handelZodError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorMessages = simpliedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simpliedError = handelCastError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorMessages = simpliedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globallErrorHandelars;
