import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { errorHandler } from "../error/errorHandler.js";
const authRoute = Router();

authRoute.post("/create", errorHandler(signup));
authRoute.post("/login", errorHandler(login));

export default authRoute;
