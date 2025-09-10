import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

// Routes
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/increase/:id", protect, increaseQuantity);
router.put("/decrease/:id", protect, decreaseQuantity);
router.delete("/remove/:id", protect, removeFromCart);

export default router;
