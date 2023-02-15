import express from "express";

import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getFriendsSuggestion,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:userId/:communityId", verifyToken, getFriendsSuggestion);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
