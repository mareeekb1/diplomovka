import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema(
  {
    messages: {
      type: Array,
      default: [],
    },
    members: {
      type: Array,
      default: [],
    },
    communityId: String,
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
