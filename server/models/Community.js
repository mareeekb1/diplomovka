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
  },
  { timestamps: true }
);
const Community = mongoose.model("Community", CommunitySchema);
export default Community;
