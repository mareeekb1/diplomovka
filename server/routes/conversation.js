import express from "express";
import {
  createConversation,
  getConversation,
  getUserConversations,
  joinConversation,
} from "../controllers/conversation.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/
router.get("/:id", verifyToken, getConversation);
router.get("/:id/user", verifyToken, getUserConversations);

/* UPDATE*/
router.post("/create", verifyToken, createConversation);
router.post("/join", verifyToken, joinConversation);

export default router;
