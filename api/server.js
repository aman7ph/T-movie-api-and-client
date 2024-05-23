import Express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/auth.route.js";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";

dotenv.config();
const app = Express();

app.use(Express.json());

export const prismaCilent = new PrismaClient({
  log: ["query"],
});
app.use("/api/auth", authRoute);
app.use(errorMiddleware);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
