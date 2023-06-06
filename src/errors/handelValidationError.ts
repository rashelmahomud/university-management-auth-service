import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponce } from '../interfaces/common';

const handelValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponce => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error..',
    errorMessages: errors,
  };
};

export default handelValidationError;
