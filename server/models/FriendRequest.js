import mongoose from "mongoose";

const FriendRequestSchema = mongoose.Schema(
  {
    fromUserId: String,
    fromUserFirstName: String,
    fromUserLastName: String,
    toUserId: String,
    toUserFirstName: String,
    toUserLastName: String,
  },
  { timestamps: true }
);
const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;
