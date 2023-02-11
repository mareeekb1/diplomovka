import Community from "../models/Community.js";
import User from "../models/User.js";

/* CREATE */
export const createCommunity = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const newCommunity = new Community({
      name,
      categoryId,
      posts: [],
      users: [],
    });
    await newCommunity.save();
    const community = await Community.find();
    res.status(201).json(community);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getCommunities = async (req, res) => {
  try {
    const community = await Community.find();
    res.status(200).json(community);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const userJoinCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    const { firstName, lastName, _id, picturePath } = user;
    const community = await Community.findById(id);
    community.users.push({ firstName, lastName, _id, picturePath });
    community.save();
    res.status(200).json(community);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
