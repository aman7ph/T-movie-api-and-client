import { Router } from "express";
import {
  getAllCategorys,
  getCategorys,
  getACategory,
} from "../controllers/category.controller.js";
import { errorHandler } from "../error/errorHandler.js";
import { authMiddleware } from "../middlewares/auth.middlewar.js";
const categoryRoute = Router();

// categoryRoute.get(
//   "/get-all-categorys",
//   authMiddleware,
//   errorHandler(getAllCategorys)
// );
// categoryRoute.get("/get-categorys", authMiddleware, errorHandler(getCategorys));
// categoryRoute.get(
//   "/get-a-category/:id",
//   authMiddleware,
//   errorHandler(getACategory)
// );
categoryRoute.get("/get-all-categorys", errorHandler(getAllCategorys));
categoryRoute.get("/get-categorys", errorHandler(getCategorys));
categoryRoute.get("/get-a-category/:id", errorHandler(getACategory));

export default categoryRoute;
