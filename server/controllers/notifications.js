import Notification from "../models/Notification.js";

/* READ */

export const getNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.find({ receiverId: id });
    res.status(200).json(notification.reverse().slice(0, 10));
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const seeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    notification.seen = true;
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
