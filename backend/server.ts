import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import env from "./config/env";
import authRoutes from "./routes/auth.routes";
import connectToMongoDB from "./db/connectToMongoDB";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/auth", authRoutes);

app.listen(env.PORT, () => {
  connectToMongoDB();
  console.log(`[server]: Server is running at http://localhost:${env.PORT}`);
});
