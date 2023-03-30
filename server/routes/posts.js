import express from "express";
import {
  commentPost,
  getCommunityPosts,
  getFeedPosts,
  getSinglePost,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/

router.get("/:userId", verifyToken, getFeedPosts);
router.get("/:id/singlePost", verifyToken, getSinglePost);
router.get("/:userId/userPosts", verifyToken, getUserPosts);
router.get("/:communityId/comumnityPosts", verifyToken, getCommunityPosts);

/* UPDATE*/
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

export default router;
