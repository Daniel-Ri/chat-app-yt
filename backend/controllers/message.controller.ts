import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

interface CustomRequest extends Request<{ id: string }> {
  user?: IUser;
}

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { message }: { message: string } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user!._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // TODO: Socket IO Functionality will go here

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user!._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Not reference but actual messages

    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
