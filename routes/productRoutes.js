import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../controllers/productController.js";

import { upload } from "../middleware/uploadMiddleware.js"; 
import { protectAdmin } from "../middleware/authAdminMiddleware.js"; // ✅ admin-protect middleware

const router = express.Router();

// ✅ Public Routes
router.get("/", getProducts);                 // Get all products
router.get("/categories", getCategories);    // Get categories
router.get("/:id", getProductById);          // Get single product

// ✅ Admin Protected Routes
router.post("/", protectAdmin, upload.single("image"), createProduct);   // Create product
router.put("/:id", protectAdmin, upload.single("image"), updateProduct); // Update product
router.delete("/:id", protectAdmin, deleteProduct);                       // Delete product

export default router;
