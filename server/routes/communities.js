import express from "express";
import {
  createCommunity,
  getCommunities,
  userJoinCommunity,
} from "../controllers/community.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/
router.get("/", verifyToken, getCommunities);

/* UPDATE*/
router.post("/create", verifyToken, createCommunity);
router.patch("/:id/join", verifyToken, userJoinCommunity);

export default router;
