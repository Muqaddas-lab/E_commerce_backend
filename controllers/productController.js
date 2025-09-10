// import mongoose from "mongoose";
// import Product from "../models/Product.js";

// // ✅ Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock, category } = req.body;

//     // Agar image upload hui hai to req.file se path nikaalo
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const product = new Product({
//       name,
//       description,
//       price,
//       image: imagePath, // ✅ multer wali file use karo
//       stock,
//       category: category || "other",
//     });

//     await product.save();
//     res
//       .status(201)
//       .json({ message: "Product created successfully", product });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Get All Products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Get Single Product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock, category } = req.body;

//     // Agar nayi image upload hui hai to use karna
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const updateData = {
//       name,
//       description,
//       price,
//       stock,
//       category: category || "other",
//     };

//     if (imagePath) updateData.image = imagePath;

//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     res.json({ message: "Product updated successfully", product });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Get unique categories
// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Product.distinct("category");
//     res.json(categories.length ? categories : ["other"]); // always return array
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




// import mongoose from "mongoose";
// import Product from "../models/Product.js";

// // ✅ Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock, category } = req.body;

//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const product = new Product({
//       name,
//       description,
//       price,
//       stock,
//       category: category || "other",
//       image: imagePath,
//     });

//     await product.save();

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ✅ Get All Products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ✅ Get Single Product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock, category } = req.body;

//     let updateData = {
//       name,
//       description,
//       price,
//       stock,
//       category: category || "other",
//     };

//     // ✅ Agar nayi image aayi hai to update karo
//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     }

//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ✅ Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ✅ Get unique categories
// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Product.distinct("category");
//     res.json({ success: true, categories: categories.length ? categories : ["other"] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };











import mongoose from "mongoose";
import Product from "../models/Product.js";

// ✅ Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Cloudinary image URL
    const imagePath = req.file ? req.file.path : null;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category: category || "other",
      image: imagePath, // Cloudinary URL saved in DB
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    let updateData = {
      name,
      description,
      price,
      stock,
      category: category || "other",
    };

    // ✅ Agar nayi image aayi hai to Cloudinary URL update karo
    if (req.file && req.file.path) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get unique categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json({ success: true, categories: categories.length ? categories : ["other"] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
