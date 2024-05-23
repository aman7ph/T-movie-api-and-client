import { Router } from "express";
import {
  getAllTypes,
  getTypes,
  getAType,
} from "../controllers/type.controller.js";
import { errorHandler } from "../error/errorHandler.js";
import { authMiddleware } from "../middlewares/auth.middlewar.js";
const typeRoute = Router();

// typeRoute.get("/get-all-types", authMiddleware, errorHandler(getAllTypes));
// typeRoute.get("/get-types", authMiddleware, errorHandler(getTypes));
// typeRoute.get("/get-a-type/:id", authMiddleware, errorHandler(getAType));

typeRoute.get("/get-all-types", errorHandler(getAllTypes));
typeRoute.get("/get-types", errorHandler(getTypes));
typeRoute.get("/get-a-type/:id", errorHandler(getAType));

export default typeRoute;
