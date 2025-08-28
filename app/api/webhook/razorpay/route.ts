import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

// Verify Razorpay webhook signature
function verifyRazorpayWebhook(body: string, signature: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(signature, 'hex')
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    if (!verifyRazorpayWebhook(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity);
        break;
      
      case 'order.paid':
        await handleOrderPaid(event.payload.order.entity);
        break;
      
      default:
        console.log(`Unhandled event: ${event.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Razorpay webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    // Find order by Razorpay payment ID
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('razorpayPaymentId', '==', payment.id));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const orderDoc = snapshot.docs[0];
      await updateDoc(doc(db, 'orders', orderDoc.id), {
        paymentStatus: 'captured',
        razorpayPaymentDetails: payment,
        updatedAt: new Date()
      });
      console.log(`Payment captured for order: ${orderDoc.id}`);
    }
  } catch (error) {
    console.error('Error handling payment captured:', error);
  }
}

async function handlePaymentFailed(payment: any) {
  try {
    // Find order by Razorpay payment ID
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('razorpayPaymentId', '==', payment.id));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const orderDoc = snapshot.docs[0];
      await updateDoc(doc(db, 'orders', orderDoc.id), {
        paymentStatus: 'failed',
        razorpayPaymentDetails: payment,
        status: 'cancelled',
        updatedAt: new Date()
      });
      console.log(`Payment failed for order: ${orderDoc.id}`);
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

async function handleOrderPaid(order: any) {
  try {
    // Find order by Razorpay order ID
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('razorpayOrderId', '==', order.id));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const orderDoc = snapshot.docs[0];
      await updateDoc(doc(db, 'orders', orderDoc.id), {
        status: 'confirmed',
        paymentStatus: 'paid',
        razorpayOrderDetails: order,
        updatedAt: new Date()
      });
      console.log(`Order paid: ${orderDoc.id}`);
    }
  } catch (error) {
    console.error('Error handling order paid:', error);
  }
}
