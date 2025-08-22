import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";  // Firebase Admin SDK setup

export async function GET() {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
