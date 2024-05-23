import { prismaClient } from "../../server.js";
import { zodChannelSchema } from "../schema/zodValidationSchema.js";
import {
  BadRequestException,
  NotFoundException,
  ErrorCode,
} from "../exceptions/exceptions.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createChannel = async (req, res, next) => {
  const parsedData = zodChannelSchema.parse(req.body);
  const { name } = parsedData;

  if (!name) {
    throw new BadRequestException(
      "Channel name is required",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
  const channel = await prismaClient.channel.create({ data: { name } });
  res.status(201).json({
    message: "Channel created successfully",
    data: channel,
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllChannels = async (req, res, next) => {
  const channels = await prismaClient.channel.findMany();
  res.status(200).json({
    message: "Channels retrieved successfully",
    data: channels,
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const getChannels = async (req, res, next) => {
  const { skip = 0, take = 5, search, sort, filter } = req.query;

  const where = search
    ? {
        name: { contains: search, mode: "insensitive" },
      }
    : {};

  const orderBy = sort
    ? {
        [sort.split(":")[0]]: sort.split(":")[1],
      }
    : {};

  const filterConditions = filter ? JSON.parse(filter) : {};

  const count = await prismaClient.channel.count({
    where: { ...where, ...filterConditions },
  });
  const channels = await prismaClient.channel.findMany({
    skip: +skip,
    take: +take,
    where: { ...where, ...filterConditions },
    orderBy,
  });

  res.status(200).json({
    message: "Channels retrieved successfully",
    count,
    data: channels,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAChannel = async (req, res, next) => {
  const channel = await prismaClient.channel.findUnique({
    where: { id: +req.params.id },
  });

  if (!channel) {
    throw new NotFoundException(
      "Channel not found",
      [],
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.status(200).json({
    message: "Channel retrieved successfully",
    data: channel,
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateAChannel = async (req, res, next) => {
  const channelData = req.body;

  const channel = await prismaClient.channel.update({
    where: { id: +req.params.id },
    data: channelData,
  });

  if (!channel) {
    throw new NotFoundException(
      "Channel not found",
      [],
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.status(200).json({
    message: "Channel updated successfully",
    data: channel,
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteAChannel = async (req, res, next) => {
  const channel = await prismaClient.channel.delete({
    where: { id: +req.params.id },
  });

  if (!channel) {
    throw new NotFoundException(
      "Channel not found",
      [],
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.status(200).json({
    message: "Channel deleted successfully",
  });
};
