import User from "../models/User.js";
import Community from "../models/Community.js";
import { convertObjectIdToString } from "../utils/utils.js";

/* READ */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getFriendsSuggestion = async (req, res) => {
  try {
    const { userId, communityId } = req.params;
    const user = await User.findById(userId);
    let community = null;
    if (
      communityId !== "undefined" &&
      communityId !== undefined &&
      communityId
    ) {
      community = await Community.findById(communityId);
    }
    let friendsSuggestions = [];
    let usersToSuggest = [];
    if (!community) {
      usersToSuggest = await User.find();
    } else {
      usersToSuggest = community.users;
    }
    friendsSuggestions = usersToSuggest.filter((suggestion) => {
      let alreadyFriends = false;
      if (userId === convertObjectIdToString(suggestion._id))
        alreadyFriends = true;
      user.friends.forEach((friend) => {
        if (friend === convertObjectIdToString(suggestion._id))
          alreadyFriends = true;
      });
      return !alreadyFriends;
    });
    friendsSuggestions = friendsSuggestions.map((item) => {
      const numberOfMutualFriends = item.friends.filter((mutualFriend) =>
        user.friends.includes(mutualFriend)
      );
      let newItem;
      if (community) newItem = item;
      if (!community) newItem = item._doc;
      return { mutualFriends: numberOfMutualFriends, ...newItem };
    });

    res.status(200).json(friendsSuggestions);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserImage = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(req.params);
    const user = await User.find({ _id: userId });
    const picturePath = user.picturePath;
    console.log(picturePath);
    res.status(200).json(picturePath);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((idF) => idF !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { occupation, location, userId } = req.body;
    const picture = req.file?.filename;
    const user = await User.findById(userId);
    if (occupation) user.occupation = occupation;
    if (location) user.location = location;
    if (picture) user.picturePath = picture;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
