import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    conversationId: String,
    text: String,
    senderId: String,
    senderName: String,
    senderLastName: String,
    newMessage: Boolean,
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
export default Message;
