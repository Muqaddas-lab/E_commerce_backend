import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  paymentMethod: { type: String, enum: ["card", "cash"], default: "card" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
