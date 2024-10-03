import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";

interface CustomRequest extends Request {
  user?: IUser;
}

export const getUsersForSidebar = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user!._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(
      "Error in getUsersForSidebar controller: ",
      (error as Error).message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
