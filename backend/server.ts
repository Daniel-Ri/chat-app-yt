import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import path from "path";
import env from "./config/env";
import connectToMongoDB from "./db/connectToMongoDB";
import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";
import { app, server } from "./socket/socket";

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

if (env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
  });
}

server.listen(env.PORT, () => {
  connectToMongoDB();
  console.log(`[server]: Server is running at http://localhost:${env.PORT}`);
});
