// lib/payment.ts
import { loadStripe } from "@stripe/stripe-js";
import Razorpay from "razorpay";

// -------------------------------
// STRIPE CONFIG (Client + Server)
// -------------------------------
let stripePromise: any;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  }
  return stripePromise;
};

// -------------------------------
// RAZORPAY CONFIG (Server-side only)
// -------------------------------
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// -------------------------------
// STRIPE HELPER FUNCTIONS
// -------------------------------

// Create a Checkout Session (Server API)
export async function createStripeCheckoutSession(
  items: { name: string; price: number; quantity: number }[]
) {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, gateway: "stripe" }),
    });

    if (!res.ok) throw new Error("Failed to create Stripe Checkout Session");
    return await res.json();
  } catch (error) {
    console.error("Stripe session error:", error);
    throw error;
  }
}

// Redirect user to Stripe Checkout (Client)
export async function redirectToStripeCheckout(sessionId: string) {
  const stripe = await getStripe();
  if (!stripe) throw new Error("Stripe not initialized");
  await stripe.redirectToCheckout({ sessionId });
}

// -------------------------------
// RAZORPAY HELPER FUNCTIONS
// -------------------------------

// Create Razorpay order (Server API)
export async function createRazorpayOrder(
  amount: number,
  currency = "INR"
) {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, gateway: "razorpay" }),
    });

    if (!res.ok) throw new Error("Failed to create Razorpay order");
    return await res.json();
  } catch (error) {
    console.error("Razorpay order error:", error);
    throw error;
  }
}

// Open Razorpay payment window (Client)
export function openRazorpayCheckout(order: any) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Window not available");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      name: "Hunar Gaatha",
      description: "Secure Payment",
      order_id: order.id,
      handler: function (response: any) {
        resolve(response); // Payment success
      },
      prefill: {
        name: "Your Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#121212" },
    };

    const razorpayWindow = new (window as any).Razorpay(options);
    razorpayWindow.open();
  });
}
