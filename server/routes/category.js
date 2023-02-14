import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ*/
router.get("/", verifyToken, getCategories);
router.get("/:categoryId", verifyToken, getCategories);

/* UPDATE */
router.post("/create", verifyToken, createCategory);

/* DELETE */
router.delete("/:id/delete", verifyToken, deleteCategory);

export default router;
