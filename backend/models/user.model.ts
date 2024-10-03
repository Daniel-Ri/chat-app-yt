import mongoose, { Types } from "mongoose";

// Define a TypeScript interface representing a user document in MongoDB
export interface IUser extends Document {
  _id: Types.ObjectId;
  fullName: string;
  username: string;
  password: string;
  gender: "male" | "female"; // Gender is limited to "male" or "female" based on your enum
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  // createdAt, updatedAt => Member since <createdAt>
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
