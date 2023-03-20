import mongoose from "mongoose";

const FriendRequestSchema = mongoose.Schema(
  {
    fromUserId: String,
    fromUserName: String,
    fromUserLastName: String,
    toUserId: String,
  },
  { timestamps: true }
);
const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;
