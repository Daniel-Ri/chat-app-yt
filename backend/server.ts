import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import env from "./config/env";
import authRoutes from "./routes/auth.routes";
import connectToMongoDB from "./db/connectToMongoDB";

const app: Express = express();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(env.PORT, () => {
  connectToMongoDB();
  console.log(`[server]: Server is running at http://localhost:${env.PORT}`);
});
