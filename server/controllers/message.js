import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
// import { convertObjectIdToString } from "../utils/utils.js";

/* CREATE */
export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    const conversationId = req.body.conversationId;
    const conversation = await Conversation.findById(conversationId);
    conversation.messages.push(newMessage);
    await conversation.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getMessages = async (req, res) => {
  try {
    const { id, fromLimit, toLimit } = req.params;
    const conversation = await Conversation.findById(id);
    let messages = conversation.messages.reverse();
    if (fromLimit && toLimit) {
      messages = messages.slice(fromLimit, toLimit);
    }
    messages = messages.reverse();
    res.status(200).json(messages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATEA */
export const readMessages = async (req, res) => {
  try {
    const { id } = req.body;
    const conversation = await Conversation.findById(id);
    conversation.messages = conversation.messages.map((item) => ({
      ...item,
      isNew: false,
    }));
    await conversation.save();
    res.status(201).json(conversation.messages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
