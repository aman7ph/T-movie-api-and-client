import { prismaClient } from "../../server.js";
import { NotFoundException, ErrorCode } from "../exceptions/exceptions.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllTypes = async (req, res, next) => {
  const types = await prismaClient.type.findMany();
  res.status(200).json({
    message: "Types retrieved successfully",
    data: types,
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const getTypes = async (req, res, next) => {
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

  const count = await prismaClient.type.count({
    where: { ...where, ...filterConditions },
  });
  const types = await prismaClient.type.findMany({
    skip: +skip,
    take: +take,
    where: { ...where, ...filterConditions },
    orderBy,
  });

  res.status(200).json({
    message: "Types retrieved successfully",
    count,
    data: types,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAType = async (req, res, next) => {
  const type = await prismaClient.type.findUnique({
    where: { id: +req.params.id },
  });

  if (!type) {
    throw new NotFoundException("Type not found", [], ErrorCode.USER_NOT_FOUND);
  }

  res.status(200).json({
    message: "Type retrieved successfully",
    data: type,
  });
};
