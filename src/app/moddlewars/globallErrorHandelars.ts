import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handelValidationError from '../../errors/handelValidationError'
import ApiError from '../../errors/apierror'

const globallErrorHandelars: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'somthing want wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simpliedError = handelValidationError(error)
    statusCode = simpliedError.statusCode
    message = simpliedError.message
    errorMessages = simpliedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globallErrorHandelars
