import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    action: String,
    text: String,
    senderId: String,
    senderName: String,
    senderLastName: String,
    receiverId: String,
    type: "message" | "post" | "community" | "friend",
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
