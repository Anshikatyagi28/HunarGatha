// /api/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

// Unified webhook handler for Razorpay
export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature") || "";
    const rawBody = await req.text();

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || "";
    const expected = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expected !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    console.log("✅ Razorpay Webhook:", event.event || event.payload?.payment?.entity?.status);

    // TODO: update order status in DB based on event

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Razorpay Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

