import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); 

const stripeKey = process.env.STRIPE_SECRET_KEY;

console.log("✅ Stripe Initialized with key:", stripeKey ? "Loaded" : "Not Loaded");

if (!stripeKey) {
  console.error("❌ STRIPE_SECRET_KEY missing from .env file");
  process.exit(1); 
}

const stripe = new Stripe(stripeKey, {
  apiVersion: "2022-11-15",
});

export default stripe;
