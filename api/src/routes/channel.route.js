import { Router } from "express";
import {
  createChannel,
  getAllChannels,
  getChannels,
  getAChannel,
  updateAChannel,
  deleteAChannel,
} from "../controllers/channel.controller.js";
import { errorHandler } from "../error/errorHandler.js";
import { authMiddleware } from "../middlewares/auth.middlewar.js";
const channelRoute = Router();

channelRoute.post(
  "/create-channel",
  authMiddleware,
  errorHandler(createChannel)
);
channelRoute.get(
  "/get-all-channels",
  authMiddleware,
  errorHandler(getAllChannels)
);
channelRoute.get("/get-channels", authMiddleware, errorHandler(getChannels));
channelRoute.get(
  "/get-a-channel/:id",
  authMiddleware,
  errorHandler(getAChannel)
);
channelRoute.put(
  "/update-channel/:id",
  authMiddleware,
  errorHandler(updateAChannel)
);
channelRoute.delete(
  "/delete-channel/:id",
  authMiddleware,
  errorHandler(deleteAChannel)
);

export default channelRoute;
