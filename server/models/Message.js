import mongoose from "mongoose";
import User from "./User";

const MessageSchema = mongoose.Schema(
  {
    communityId: {
      type: String,
      required: true,
    },
    sender: {
      type: User,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
export default Message;
