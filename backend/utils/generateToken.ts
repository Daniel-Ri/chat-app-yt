import { Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { Types } from "mongoose";

const generateTokenAndSetCookie = (userId: Types.ObjectId, res: Response) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
