import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    communityId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
export default Message;
