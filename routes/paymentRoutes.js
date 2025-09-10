// import express from "express";
// import { createPayment, confirmPayment } from "../controllers/paymentController.js";

// const router = express.Router();

// router.post("/create", createPayment);
// router.post("/webhook", express.raw({ type: "application/json" }), confirmPayment);

// export default router;





// import express from "express";
// import { createPayment, confirmPayment } from "../controllers/paymentController.js";

// const router = express.Router();

// // Create payment
// router.post("/create", createPayment);

// // Stripe webhook (raw body)
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   confirmPayment
// );

// export default router;






import express from "express";
import { createPayment, confirmPayment } from "../controllers/paymentController.js";

const router = express.Router();

// create payment
router.post("/create", createPayment);

// stripe webhook (raw body)
router.post("/webhook", express.raw({ type: "application/json" }), confirmPayment);

// ✅ Default export
export default router;
