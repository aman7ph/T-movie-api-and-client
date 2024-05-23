import {
  ErrorCode,
  HttpException,
  InternalException,
  UnprocessableEntity,
} from "../exceptions/exceptions.js";

import { ZodError } from "zod";

export const errorHandler = (method) => {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof ZodError) {
        exception = new UnprocessableEntity(
          "Validation failed",
          error.errors,
          ErrorCode.UNPROCESSABLE_ENTITY
        );
      } else {
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
