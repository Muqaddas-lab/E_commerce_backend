import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    stock: { type: Number, default: 0 },
    category: { type: String, default: "other" }, // ✅ Category field add
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
