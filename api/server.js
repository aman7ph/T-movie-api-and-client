import Express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/auth.route.js";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import channelRoute from "./src/routes/channel.route.js";
import typeRoute from "./src/routes/type.route.js";
import categoryRoute from "./src/routes/category.route.js";

dotenv.config();
const app = Express();

app.use(Express.json());

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use("/api/auth", authRoute);
app.use("/api/channel", channelRoute);
app.use("/api/type", typeRoute);
app.use("/api/category", categoryRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
