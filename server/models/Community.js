import mongoose from "mongoose";

const CommunitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    posts: {
      type: Array,
      default: [],
    },
    chatContainer: String,
    messages: {
      type: Array,
      default: [],
    },
    users: {
      type: Array,
      default: [],
    },
    owner: {
      type: String,
    },
    icon: String,
    description: String,
  },
  { timestamps: true }
);
const Community = mongoose.model("Community", CommunitySchema);
export default Community;
