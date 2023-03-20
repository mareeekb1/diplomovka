import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    text: String,
    senderId: String,
    senderName: String,
    senderLastName: String,
    isNew: Boolean,
    type: "message" | "post" | "community" | "friend",
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
