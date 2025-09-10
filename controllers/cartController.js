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
