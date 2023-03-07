import express from "express";
import { searchUsersOrCommunities } from "../controllers/general.js";

const router = express.Router();

router.get("/search/:search", searchUsersOrCommunities);

export default router;
