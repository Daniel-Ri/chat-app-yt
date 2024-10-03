import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";
import User, { IUser } from "../models/user.model";

// Define a custom interface for the JWT payload
interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

// Extend the Request interface locally in this file
interface CustomRequest extends Request {
  user?: IUser; // Use the IUser interface to type the user property
}

const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: "Unauthorized - No Token Provided" });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ error: "Unauthorized - Invalid Token" });
      return;
    }

    const userId = (decoded as CustomJwtPayload).userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", (error as Error).message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
