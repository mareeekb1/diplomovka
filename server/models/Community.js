import mongoose from "mongoose";

const CommunitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    posts: {
      type: Array,
      default: [],
    },
    users: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Community = mongoose.model("Community", CommunitySchema);
export default Community;
