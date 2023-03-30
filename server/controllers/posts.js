import Notification from "../models/Notification.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, communityId } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      communityId: communityId || null,
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: req.file?.filename,
      likes: {},
      comments: [],
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find();
    const { communities, friends } = await User.findById(userId);
    // console.log(communities, friends, post);

    res.status(200).json(post.reverse());
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post.reverse());
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getCommunityPosts = async (req, res) => {
  try {
    const { communityId } = req.params;
    const post = await Post.find();
    const filteredPosts = post.filter(
      (item) => item.communityId === communityId
    );
    res.status(200).json(filteredPosts.reverse());
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
      if (userId !== post.userId) {
        const sender = await User.findById(userId);
        const notification = new Notification({
          type: "post",
          text: "liked your post.",
          senderId: userId,
          senderName: sender.firstName,
          senderLastName: sender.lastName,
          receiverId: post.userId,
          action: post._id,
        });
        await notification.save();
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    post.comments.push(req.body);
    await post.save();
    if (userId !== post.userId) {
      const sender = await User.findById(userId);
      const notification = new Notification({
        type: "post",
        text: "commented on your post.",
        senderId: userId,
        senderName: sender.firstName,
        senderLastName: sender.lastName,
        receiverId: post.userId,
        action: post._id,
      });
      await notification.save();
    }

    res.status(200).json(req.body);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
