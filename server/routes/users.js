import express from "express";

import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getFriendsSuggestion,
  getUserImage,
  friendRequest,
  handleFriendRequest,
  getFriendRequests,
  getUserPendingFriendRequests,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:userId/:communityId", verifyToken, getFriendsSuggestion);
router.get("/:userId/picture", verifyToken, getUserImage);
router.get("/:id/friend-request/get", verifyToken, getFriendRequests);
router.get(
  "/:id/friend-request/pending",
  verifyToken,
  getUserPendingFriendRequests
);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.post("/send-request", friendRequest);
router.post("/handlefriendrequest", handleFriendRequest);

export default router;
