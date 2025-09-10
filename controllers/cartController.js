// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";

// // ✅ Get User Cart
// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
//     if (!cart) {
//       return res.status(200).json({ success: true, data: { items: [] } });
//     }
//     res.status(200).json({ success: true, data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching cart", error: error.message });
//   }
// };

// // ✅ Add Item to Cart
// export const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     let cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) {
//       cart = new Cart({ user: req.user.id, items: [] });
//     }

//     const existingItem = cart.items.find(item => item.product.toString() === productId);

//     if (existingItem) {
//       existingItem.quantity += quantity || 1;
//     } else {
//       cart.items.push({ product: productId, quantity: quantity || 1 });
//     }

//     await cart.save();
//     res.status(200).json({ success: true, message: "Item added to cart", data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
//   }
// };

// // ✅ Remove Item from Cart
// export const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     let cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) {
//       return res.status(404).json({ success: false, message: "Cart not found" });
//     }

//     cart.items = cart.items.filter(item => item.product.toString() !== productId);

//     await cart.save();
//     res.status(200).json({ success: true, message: "Item removed from cart", data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error removing item from cart", error: error.message });
//   }
// };

// // ✅ Clear Cart
// export const clearCart = async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ user: req.user.id });

//     if (!cart) {
//       return res.status(404).json({ success: false, message: "Cart not found" });
//     }

//     cart.items = [];
//     await cart.save();

//     res.status(200).json({ success: true, message: "Cart cleared", data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error clearing cart", error: error.message });
//   }
// };










import Cart from "../models/Cart.js";

// 📌 Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json({ cart: cart ? cart.items : [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// 📌 Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("items.product");
    res.json({ cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// 📌 Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== req.params.id
    );

    await cart.save();
    await cart.populate("items.product");
    res.json({ cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
};

// 📌 Increase quantity
export const increaseQuantity = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === req.params.id);
    if (item) {
      item.quantity += 1;
    }

    await cart.save();
    await cart.populate("items.product");
    res.json({ cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: "Error increasing quantity" });
  }
};

// 📌 Decrease quantity
export const decreaseQuantity = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === req.params.id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items = cart.items.filter(
          (i) => i.product.toString() !== req.params.id
        );
      }
    }

    await cart.save();
    await cart.populate("items.product");
    res.json({ cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: "Error decreasing quantity" });
  }
};
