import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const requiredFields = ['orderId', 'razorpayPaymentId', 'razorpayOrderId', 'customerId', 'items', 'amount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Create order document
    const orderData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add additional metadata
      platform: 'web',
      source: 'product_modal',
      currency: 'INR'
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    
    // Update the document with the Firestore ID
    await updateDoc(doc(db, 'orders', docRef.id), {
      firestoreId: docRef.id
    });

    // Also save to a separate collection for easier querying
    await addDoc(collection(db, 'customer_orders'), {
      customerId: body.customerId,
      orderId: body.orderId,
      firestoreId: docRef.id,
      amount: body.amount,
      status: body.status,
      paymentStatus: body.paymentStatus,
      createdAt: new Date(),
      items: body.items
    });

    return NextResponse.json({ 
      success: true, 
      orderId: docRef.id,
      message: 'Order created successfully' 
    });

  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      error: 'Failed to create order',
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');
    
    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    // Get orders for specific customer
    const { collection, query, where, getDocs, orderBy, limit } = await import('firebase/firestore');
    
    const ordersQuery = query(
      collection(db, 'customer_orders'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const snapshot = await getDocs(ordersQuery);
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ orders });

  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch orders',
      details: error.message 
    }, { status: 500 });
  }
}
