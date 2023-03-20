import express from "express";
import {
  getMessages,
  readMessages,
  sendMessage,
} from "../controllers/message.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/
router.get("/:id/:fromLimit/:toLimit", verifyToken, getMessages);

/* UPDATE*/
router.post("/send", verifyToken, sendMessage);
router.post("/read", verifyToken, readMessages);

export default router;
