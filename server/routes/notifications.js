import express from "express";
import {
  getNotifications,
  seeNotification,
} from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/

router.get("/:id", verifyToken, getNotifications);

/* UPDATE*/
router.patch("/:id/seen", verifyToken, seeNotification);

export default router;
