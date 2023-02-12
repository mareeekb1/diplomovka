import express from "express";
import { getMessages, sendMessage } from "../controllers/message.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/
router.get("/", verifyToken, getMessages);

/* UPDATE*/
router.post("/send", verifyToken, sendMessage);

export default router;
