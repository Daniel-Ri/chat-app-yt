import mongoose, { Types } from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
