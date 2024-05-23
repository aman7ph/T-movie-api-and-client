export class HttpException extends Error {
  constructor(message, errorCode, statusCode, errors) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const ErrorCode = {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
  UNPROCESSABLE_ENTITY: 4220,
  INTERNAL_EXCEPTION: 5000,
  UNAUTHORIZED: 4001,
};

export class BadRequestException extends HttpException {
  constructor(message, errorCode) {
    super(
      message,
      errorCode,
      400,
      "The request could not be understood by the server due to malformed syntax. Please review your request and try again."
    );
  }
}

export class UnprocessableEntity extends HttpException {
  constructor(message, errors, errorCode) {
    super(
      message,
      errorCode,
      422,
      "The server was unable to process the contained instructions. Please review your request and try again."
    );
    this.errors = errors;
  }
}

export class InternalException extends HttpException {
  constructor(message, errors, errorCode) {
    super(
      message,
      errorCode,
      500,
      "An unexpected error occurred on the server. Please try again later."
    );
  }
}

export class NotFoundException extends HttpException {
  constructor(message, errors, errorCode) {
    super(
      message,
      errorCode,
      404,
      "The requested resource could not be found. Please check the URL and try again."
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message, errors, errorCode) {
    super(message, errorCode, 401, "Authorization failed.");
  }
}
