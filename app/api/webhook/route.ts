// /api/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";
import { razorpay } from "@/lib/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// STRIPE WEBHOOK
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  try {
    const rawBody = await req.text(); // must use raw body
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Stripe Payment Success:", session);
      // TODO: mark order as paid in DB
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Stripe Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// RAZORPAY WEBHOOK (optional extra endpoint if needed)
export async function verifyRazorpaySignature(
  body: any,
  signature: string
): Promise<boolean> {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(JSON.stringify(body))
    .digest("hex");

  return expected === signature;
}
