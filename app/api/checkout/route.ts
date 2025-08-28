// /api/checkout/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // RAZORPAY FLOW (only)
    if (body.gateway === "razorpay") {
      // Validate required fields
      if (!body.amount || body.amount <= 0) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
      }

      const options = {
        amount: Math.round(body.amount * 100), // convert to paise
        currency: body.currency || "INR",
        receipt: body.receipt || `order_rcpt_${Date.now()}`,
        notes: body.notes || {},
        partial_payment: false,
        payment_capture: 1
      };

      try {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
          key_secret: process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || "",
        });
        const order = await razorpay.orders.create(options);
        return NextResponse.json({
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
          status: order.status
        });
      } catch (razorpayError: any) {
        console.error("Razorpay order creation error:", razorpayError);
        return NextResponse.json({ 
          error: "Failed to create Razorpay order",
          details: razorpayError.error?.description || razorpayError.message 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Invalid gateway" }, { status: 400 });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
