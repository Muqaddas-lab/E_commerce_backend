// testStripe.js
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

async function test() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // $1
      currency: "usd",
    });
    console.log("Payment Intent created:", paymentIntent.id);
  } catch (err) {
    console.error("Stripe Error:", err);
  }
}

test();
