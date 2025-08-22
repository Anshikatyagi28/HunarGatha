// /api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { razorpay } from "@/lib/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // STRIPE FLOW
    if (body.gateway === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: body.items.map((item: any) => ({
          price_data: {
            currency: "usd",
            product_data: { name: item.name },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      });

      return NextResponse.json({ id: session.id });
    }

    // RAZORPAY FLOW
    if (body.gateway === "razorpay") {
      const options = {
        amount: body.amount * 100, // convert to paise
        currency: body.currency || "INR",
        receipt: `order_rcpt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      return NextResponse.json(order);
    }

    return NextResponse.json({ error: "Invalid gateway" }, { status: 400 });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
