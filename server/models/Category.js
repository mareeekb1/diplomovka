import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);
const Community = mongoose.model("Community", CategorySchema);
export default Community;
