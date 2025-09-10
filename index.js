// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import path from "path";
// // import { fileURLToPath } from "url";

// // // Import custom modules
// // import { connectToDatabase } from "./config/db.js";
// // import userRoutes from "./routes/userRoutes.js";
// // import productRoutes from "./routes/productRoutes.js";
// // import cartRoutes from "./routes/cartRoutes.js";
// // import adminRoutes from "./routes/adminRoutes.js";
// // import paymentRoutes from "./routes/paymentRoutes.js";
// // import { errorHandler } from "./middleware/errorMiddleware.js";

// // // Initialize Express app
// // const app = express();

// // // Load environment variables from .env file
// // dotenv.config();

// // // Connect to MongoDB database
// // connectToDatabase();

// // // Get __dirname in ES module scope
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Enable CORS for your frontend
// // app.use(cors({
// //   origin: ["http://localhost:3000"], // updated frontend origin (Vite default)
// //   credentials: true,                 // allow cookies if needed
// // }));

// // // Middleware to parse cookies and JSON
// // app.use(cookieParser());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true })); // for form-data

// // // Serve uploaded images statically
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // API Routes
// // app.use("/api/users", userRoutes);
// // app.use("/api/products", productRoutes);
// // app.use("/api/cart", cartRoutes);
// // app.use("/api/admin", adminRoutes);
// // app.use("/api/payment", paymentRoutes);

// // // Default route
// // app.get("/", (req, res) => {
// //   res.status(200).send("🛒 E-commerce API is running!");
// // });

// // // Error handler middleware (always at the end)
// // app.use(errorHandler);

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on port ${PORT}`);
// // });




// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";

// // 🔹 Load environment variables at the very start
// dotenv.config();

// // Import custom modules
// import { connectToDatabase } from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import { errorHandler } from "./middleware/errorMiddleware.js";

// // 🔹 Initialize Express app
// const app = express();

// // 🔹 Connect to MongoDB
// connectToDatabase();

// // 🔹 Get __dirname in ES module scope
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 🔹 Middleware
// // app.use(
// //   cors({
// //     origin: process.env.FRONTEND_URL || "http://localhost:3000",
// //     credentials: true,
// //   })
// // );
// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL || "http://localhost:3000",
//       "https://e-commerce-frontend-three-silk.vercel.app"
//     ],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());

// // ⚠️ Stripe webhook ke liye raw body support
// app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// // Normal JSON body parser
// app.use(express.urlencoded({ extended: true }));

// // 🔹 Serve uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 🔹 API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/payment", paymentRoutes); // Stripe/payment routes

// // 🔹 Default route
// app.get("/", (req, res) => {
//   res.status(200).send("🛒 E-commerce API is running!");
// });

// // 🔹 Error handler (last middleware)
// app.use(errorHandler);

// // 🔹 Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(
//     `🔹 FRONTEND URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
//   );
// });










import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// 🔹 Load environment variables at the very start
dotenv.config();

// Import custom modules
import { connectToDatabase } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// 🔹 Initialize Express app
const app = express();

// 🔹 Connect to MongoDB
connectToDatabase();

// 🔹 Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "https://e-commerce-frontend-three-silk.vercel.app" // deployed frontend
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form-data

// ⚠️ Stripe webhook ke liye raw body support
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// 🔹 Serve uploaded images (development only, Cloudinary ke liye ye optional hai)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes); // Stripe/payment routes

// 🔹 Default route
app.get("/", (req, res) => {
  res.status(200).send("🛒 E-commerce API is running!");
});

// 🔹 Error handler (last middleware)
app.use(errorHandler);

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(
    `🔹 FRONTEND URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
  );
});
