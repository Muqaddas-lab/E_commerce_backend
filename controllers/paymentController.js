import stripe from "../config/stripe.js";
import Order from "../models/Order.js";

export const createPayment = async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      products: cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // cents
      currency: "usd",
      metadata: { orderId: order._id.toString() },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment creation failed" });
  }
};

export const confirmPayment = async (req, res) => {
  const event = req.body;

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, { paymentStatus: "completed" });
  }

  res.json({ received: true });
};
