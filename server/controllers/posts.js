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
