import Message from "../models/Message.js";
// import { convertObjectIdToString } from "../utils/utils.js";

/* CREATE */
export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getMessages = async (req, res) => {
  try {
    const { communityId } = req.body;
    const message = await Message.find({ communityId });

    res.status(200).json(message);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
