import { prismaClient } from "../../server.js";
import jwt from "jsonwebtoken";

import {
  BadRequestException,
  ErrorCode,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      return next(
        new NotFoundException("User not found", [], ErrorCode.USER_NOT_FOUND)
      );
    }

    console.log(user);
    next();
  } catch (error) {
    next(new BadRequestException(error, [], ErrorCode.USER_NOT_FOUND));
  }
};
