import express from "express";
import { createPayment, confirmPayment } from "../controllers/paymentController.js";

const router = express.Router();

// create payment
router.post("/create", createPayment);

// stripe webhook (raw body)
router.post("/webhook", express.raw({ type: "application/json" }), confirmPayment);

// ✅ Default export
export default router;
