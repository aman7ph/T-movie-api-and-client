import { prismaClient } from "../../server.js";
import { NotFoundException, ErrorCode } from "../exceptions/exceptions.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllCategorys = async (req, res, next) => {
  const categorys = await prismaClient.category.findMany();
  res.status(200).json({
    message: "Categorys retrieved successfully",
    data: categorys,
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCategorys = async (req, res, next) => {
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

  const count = await prismaClient.category.count({
    where: { ...where, ...filterConditions },
  });
  const categorys = await prismaClient.category.findMany({
    skip: +skip,
    take: +take,
    where: { ...where, ...filterConditions },
    orderBy,
  });

  res.status(200).json({
    message: "Categorys retrieved successfully",
    count,
    data: categorys,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getACategory = async (req, res, next) => {
  const category = await prismaClient.category.findUnique({
    where: { id: +req.params.id },
  });

  if (!category) {
    throw new NotFoundException(
      "Category not found",
      [],
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.status(200).json({
    message: "Category retrieved successfully",
    data: category,
  });
};
