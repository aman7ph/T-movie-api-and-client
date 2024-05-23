import { prismaClient } from "../../server.js";
import pkg from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ErrorCode,
  HttpException,
  BadRequestException,
} from "../exceptions/exceptions.js";
import { zodUserSchema } from "../schema/zodValidationSchema.js";
const { compareSync, hashSync } = pkg;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const signup = async (req, res, next) => {
  const parsedData = zodUserSchema.parse(req.body);
  const { PhoneNumber, password } = parsedData;

  const existingUser = await prismaClient.user.findFirst({
    where: { PhoneNumber },
  });

  if (existingUser) {
    throw new HttpException(
      "A user with this phone number already exists",
      ErrorCode.USER_ALREADY_EXISTS,
      409,
      []
    );
  }

  const newUser = await prismaClient.user.create({
    data: {
      PhoneNumber,
      password: hashSync(password, 10),
    },
  });

  if (!newUser) {
    throw new InternalException(
      "Failed to create user",
      [],
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  res.status(201).json({ message: "User created successfully" });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const login = async (req, res, next) => {
  const zodd = zodUserSchema.parse(req.body);
  console.log(zodd);

  const { PhoneNumber, password } = req.body;

  if (!PhoneNumber || !password) {
    throw new BadRequestException(
      "PhoneNumber and password are required",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }

  const user = await prismaClient.user.findFirst({
    where: { PhoneNumber },
  });

  if (!user) {
    throw new NotFoundException("User not found", [], ErrorCode.USER_NOT_FOUND);
  }

  const passwordMatch = compareSync(password, user.password);
  if (!passwordMatch) {
    throw new HttpException(
      "Incorrect password",
      ErrorCode.INCORRECT_PASSWORD,
      401,
      []
    );
  }

  const token = jwt.sign(
    { userId: user.id, PhoneNumber: user.PhoneNumber },
    process.env.JWT_SECRET
  );

  const userWithoutPassword = (user) => {
    const userData = { ...user };
    delete userData.password;
    return userData;
  };

  res.status(200).json({
    message: "Login successful",
    data: userWithoutPassword(user),
    token: token,
  });
};
