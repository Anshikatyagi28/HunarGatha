// lib/payment.ts (client-safe helpers)

// -------------------------------
// TYPES
// -------------------------------
export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface RazorpayOrderData {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
  customer_id?: string;
}

export interface RazorpayPaymentData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// -------------------------------
// RAZORPAY HELPER FUNCTIONS
// -------------------------------

// Create Razorpay order (Server API)
export async function createRazorpayOrder(
  data: RazorpayOrderData
) {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, gateway: "razorpay" }),
    });

    if (!res.ok) throw new Error("Failed to create Razorpay order");
    return await res.json();
  } catch (error) {
    console.error("Razorpay order error:", error);
    throw error;
  }
}

// Load Razorpay checkout script on demand (Client)
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Open Razorpay payment window (Client)
export async function openRazorpayCheckout(
  order: any,
  userData?: { name?: string; email?: string; contact?: string }
) {
  if (typeof window === "undefined") throw new Error("Window not available");
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error("Failed to load Razorpay SDK");

  return new Promise((resolve, reject) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "Hunar Gaatha",
      description: "Secure Payment for Handcrafted Products",
      order_id: order.id,
      handler: function (response: RazorpayPaymentData) {
        resolve(response);
      },
      prefill: {
        name: userData?.name || "Customer",
        email: userData?.email || "customer@example.com",
        contact: userData?.contact || "9999999999",
      },
      theme: {
        color: "#B66E41"
      },
      modal: {
        ondismiss: function () {
          reject(new Error("Payment cancelled by user"));
        }
      }
    } as any;

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  });
}

// -------------------------------
// PAYMENT UTILITIES
// -------------------------------

// Format amount to paise (Razorpay requirement)
export function formatAmountToPaise(amount: number): number {
  return Math.round(amount * 100);
}

// Format amount from paise to rupees
export function formatAmountFromPaise(amount: number): number {
  return amount / 100;
}

// Calculate total amount including tax
export function calculateTotalAmount(items: PaymentItem[], taxRate: number = 0.18): number {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  return subtotal + tax;
}
