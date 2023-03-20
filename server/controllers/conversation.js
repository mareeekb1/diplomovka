import Conversation from "../models/Conversation.js";
import User from "../models/User.js";

/* CREATE */
export const createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation(req.body);
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* UPDATE */
export const joinConversation = async (req, res) => {
  try {
    const { conversationId, userId } = req.body;
    const conversation = await Conversation.findById(conversationId);
    const user = await User.findById(userId);
    user.conversations.push(conversationId);
    conversation.members.push(userId);
    await user.save();
    await conversation.save();
    res.status(201).json({ message: "Joined successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */

export const getConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findById(id);

    res.status(200).json(conversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserConversations = async (req, res) => {
  try {
    const { id } = req.params;
    const conversations = await Conversation.find();
    const filteredConversations = conversations.filter(
      ({ members }) => members.includes(id) && members.length === 2
    );

    res.status(200).json(filteredConversations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
