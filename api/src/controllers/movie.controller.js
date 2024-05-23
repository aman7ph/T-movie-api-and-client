import { prismaClient } from "../../server.js";
import { zodMovieSchema } from "../schema/zodValidationSchema.js";
import {
  BadRequestException,
  NotFoundException,
  ErrorCode,
} from "../exceptions/exceptions.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createMovie = async (req, res, next) => {
  const parsedData = zodMovieSchema.parse(req.body);
  const {
    title,
    duration,
    description,
    channelId,
    typeId,
    categoryId,
    videoUrl,
  } = parsedData;

  if (
    !title ||
    !duration ||
    !description ||
    !channelId ||
    !typeId ||
    !categoryId ||
    !videoUrl
  ) {
    throw new BadRequestException(
      "All fields are required",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
  const movie = await prismaClient.movie.create({
    data: {
      title,
      duration,
      description,
      status,
      channelId,
      typeId,
      categoryId,
      videoUrl,
    },
  });
  res.status(201).json({
    message: "Movie created successfully",
    data: movie,
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllMovies = async (req, res, next) => {
  const movies = await prismaClient.movie.findMany({
    include: {
      channel: {
        select: {
          name: true,
        },
      },
      type: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  res.status(200).json({
    message: "Movies retrieved successfully",
    data: movies.map((movie) => ({
      ...movie,
      channel: movie.channel.name,
      type: movie.type.name,
      category: movie.category.name,
    })),
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const getMovies = async (req, res, next) => {
  const { skip = 0, take = 5, search, sort, filter } = req.query;

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const orderBy = sort
    ? {
        [sort.split(":")[0]]: sort.split(":")[1],
      }
    : {};

  const filterConditions = filter ? JSON.parse(filter) : {};

  const count = await prismaClient.movie.count({ where });
  const movies = await prismaClient.movie.findMany({
    skip: +skip,
    take: +take,
    where: { ...where, ...filterConditions },
    orderBy,
    include: {
      channel: {
        select: {
          name: true,
        },
      },
      type: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  res.status(200).json({
    message: "Movies retrieved successfully",
    count,
    data: movies.map((movie) => ({
      ...movie,
      channel: movie.channel.name,
      type: movie.type.name,
      category: movie.category.name,
    })),
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAMovie = async (req, res, next) => {
  const movie = await prismaClient.movie.findUnique({
    where: { id: +req.params.id },
    include: {
      channel: {
        select: {
          name: true,
        },
      },
      type: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!movie) {
    throw new NotFoundException(
      "Movie not found",
      [],
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.status(200).json({
    message: "Movie retrieved successfully",
    data: {
      ...movie,
      channel: movie.channel.name,
      type: movie.type.name,
      category: movie.category.name,
    },
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateAMovie = async (req, res, next) => {
  const movieData = req.body;

  const movie = await prismaClient.movie.update({
    where: { id: +req.params.id },
    data: movieData,
  });

  if (!movie) {
    throw new NotFoundException(
      "Movie not found",
      [],
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.status(200).json({
    message: "Movie updated successfully",
    data: movie,
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteAMovie = async (req, res, next) => {
  const movie = await prismaClient.movie.delete({
    where: { id: +req.params.id },
  });

  if (!movie) {
    throw new NotFoundException(
      "Movie not found",
      [],
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.status(200).json({
    message: "Movie deleted successfully",
  });
};
