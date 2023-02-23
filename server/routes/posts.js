import express from "express";
import {
  getCommunityPosts,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/

router.get("/:userId", verifyToken, getFeedPosts);
router.get("/:userId/userPosts", verifyToken, getUserPosts);
router.get("/:communityId/comumnityPosts", verifyToken, getCommunityPosts);

/* UPDATE*/
router.patch("/:id/like", verifyToken, likePost);

export default router;
