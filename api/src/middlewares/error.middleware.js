import { HttpException } from "../exceptions/exceptions.js";

export const errorMiddleware = (error, req, res, next) => {
  if (error instanceof HttpException) {
    res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
      errors: error.errors,
    });
  } else {
    res.status(500).json({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};
