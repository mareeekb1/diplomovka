import express from "express";
import {
  createCommunity,
  getCommunities,
  getUserCommunities,
  userJoinCommunity,
} from "../controllers/community.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/
router.get("/", verifyToken, getCommunities);
router.get("/:categoryId", verifyToken, getCommunities);
router.get("/:userId/user", verifyToken, getUserCommunities);

/* UPDATE*/
router.post("/create", verifyToken, createCommunity);
router.patch("/:id/join", verifyToken, userJoinCommunity);

export default router;
