import Community from "../models/Community.js";
import User from "../models/User.js";
import { convertObjectIdToString } from "../utils/utils.js";

/* CREATE */
export const createCommunity = async (req, res) => {
  try {
    const { name, categoryId, icon, owner } = req.body;
    const user = await User.findById(owner);
    const newCommunity = new Community({
      name,
      categoryId,
      icon,
      owner,
      users: [user],
    });
    await newCommunity.save();
    res.status(201).json(newCommunity);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getUserCommunities = async (req, res) => {
  try {
    const { userId } = req.params;

    const community = await Community.find();
    const filteredCommunities = community.filter((item) => {
      let found = false;
      item.users.forEach((user) => {
        if (convertObjectIdToString(user._id) === userId) {
          found = true;
        }
      });
      return found;
    });

    res.status(200).json(filteredCommunities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getCommunities = async (req, res) => {
  try {
    const { categoryId } = req.params;
    let community;
    if (!categoryId || categoryId === "categoryId" || categoryId === " ") {
      community = await Community.find();
    } else {
      if (categoryId) community = await Community.find({ categoryId });
    }

    res.status(200).json(community);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getCommunityById = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await Community.findById(communityId);

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
    const community = await Community.findById(id);

    const isParticipant = community.users.find(
      ({ _id }) => convertObjectIdToString(_id) === userId
    );

    if (Boolean(isParticipant)) {
      community.users = community.users.filter(
        ({ _id }) => convertObjectIdToString(_id) !== userId
      );
    } else {
      community.users.push(user);
    }
    community.save();
    res.status(200).json(community);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
