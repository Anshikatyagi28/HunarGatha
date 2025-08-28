# Razorpay Payment Gateway Integration

This document explains how to set up and use the Razorpay payment gateway integration in your Hunar Gaatha application.

## 🚀 Features

- **Direct Purchase**: Users can buy products directly from the bestselling modal
- **Authentication Required**: Only authenticated users can make purchases
- **Database Integration**: All orders are automatically saved to Firestore
- **Webhook Support**: Real-time payment status updates
- **Secure Payments**: End-to-end encrypted payment processing
- **Multiple Payment Methods**: UPI, Cards, Net Banking, Wallets

## 📋 Prerequisites

1. **Razorpay Account**: Sign up at [razorpay.com](https://razorpay.com)
2. **Firebase Project**: Set up Firebase for authentication and database
3. **Node.js**: Version 16 or higher
4. **Next.js**: Version 13 or higher

## ⚙️ Setup Instructions

### 1. Environment Variables

Copy the `env.example` file to `.env.local` and fill in your credentials:

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
# ... other Firebase config
```

### 2. Razorpay Dashboard Setup

1. **Get API Keys**:
   - Login to Razorpay Dashboard
   - Go to Settings → API Keys
   - Generate new key pair
   - Copy Key ID and Key Secret

2. **Configure Webhooks**:
   - Go to Settings → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/webhook/razorpay`
   - Select events: `payment.captured`, `payment.failed`, `order.paid`
   - Copy webhook secret (if required)

3. **Test Mode vs Live Mode**:
   - Use test mode for development
   - Switch to live mode for production
   - Update API keys accordingly

### 3. Firebase Setup

1. **Enable Firestore**:
   - Go to Firebase Console → Firestore Database
   - Create database in test mode
   - Set up security rules

2. **Update Firestore Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.customerId || 
         request.auth.uid == request.resource.data.customerId);
    }
    match /customer_orders/{orderId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.customerId || 
         request.auth.uid == request.resource.data.customerId);
    }
  }
}
```

## 🔧 Implementation Details

### Payment Flow

1. **User clicks "Buy Now"** in ProductModal
2. **Authentication check** - redirects to login if not authenticated
3. **Payment modal opens** with order summary
4. **Razorpay order created** via API
5. **Payment window opens** with Razorpay checkout
6. **Payment processed** by Razorpay
7. **Order saved** to Firestore database
8. **Success/failure** handled appropriately

### Database Schema

#### Orders Collection
```javascript
{
  orderId: "order_1234567890_user123",
  razorpayPaymentId: "pay_abc123",
  razorpayOrderId: "order_def456",
  customerId: "user123",
  customerEmail: "user@example.com",
  customerName: "John Doe",
  items: [
    {
      id: "1",
      name: "Royal Mogra Itar",
      price: 2450,
      quantity: 1,
      image: "image_url"
    }
  ],
  amount: 2891, // including 18% tax
  status: "confirmed", // confirmed, pending, cancelled
  paymentStatus: "paid", // paid, failed, pending
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  platform: "web",
  source: "product_modal",
  currency: "INR"
}
```

#### Customer Orders Collection
```javascript
{
  customerId: "user123",
  orderId: "order_1234567890_user123",
  firestoreId: "firestore_doc_id",
  amount: 2891,
  status: "confirmed",
  paymentStatus: "paid",
  createdAt: "2024-01-01T00:00:00.000Z",
  items: [...]
}
```

## 🎯 Usage Examples

### Basic Product Purchase

```javascript
import RazorpayPayment from '@/components/Payment/RazorpayPayment';

const handleBuyNow = () => {
  if (!currentUser) {
    toast.error('Please login to continue with purchase');
    return;
  }
  setShowPayment(true);
};

// In your JSX
{showPayment && (
  <RazorpayPayment
    items={[{
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    }]}
    onPaymentSuccess={handlePaymentSuccess}
    onPaymentFailure={handlePaymentFailure}
    onClose={() => setShowPayment(false)}
  />
)}
```

### Custom Payment Amount

```javascript
const orderData = {
  amount: 5000, // ₹5000
  currency: 'INR',
  receipt: `order_${Date.now()}_${currentUser.uid}`,
  notes: {
    customer_id: currentUser.uid,
    customer_email: currentUser.email,
    items: JSON.stringify(items)
  }
};

const order = await createRazorpayOrder(orderData);
```

## 🔒 Security Features

1. **Webhook Signature Verification**: All webhooks are verified using HMAC-SHA256
2. **Authentication Required**: Only logged-in users can make payments
3. **Server-side Order Creation**: Orders are created server-side for security
4. **Payment Verification**: Payment success is verified using Razorpay signatures
5. **Database Validation**: All order data is validated before storage

## 🧪 Testing

### Test Cards (Test Mode)

- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI IDs

- **Success**: success@razorpay
- **Failure**: failure@razorpay

## 🚨 Error Handling

### Common Errors

1. **Authentication Required**:
   - User must be logged in
   - Redirect to login page

2. **Payment Failed**:
   - Show error message
   - Allow retry
   - Log error for debugging

3. **Network Issues**:
   - Retry mechanism
   - Fallback options
   - User-friendly error messages

### Error Logging

All errors are logged to:
- Console (development)
- Firebase (production)
- Razorpay dashboard

## 📱 Mobile Responsiveness

The payment modal is fully responsive and works on:
- Desktop browsers
- Mobile browsers
- Progressive Web Apps (PWA)

## 🔄 Webhook Events

### Supported Events

1. **payment.captured**: Payment successfully captured
2. **payment.failed**: Payment failed
3. **order.paid**: Order marked as paid

### Webhook Processing

- Automatic order status updates
- Real-time payment tracking
- Database synchronization

## 📊 Monitoring & Analytics

### Track Payment Metrics

- Success rates
- Failure reasons
- Payment methods used
- Average order value
- Conversion rates

### Integration with Analytics

- Google Analytics
- Firebase Analytics
- Custom dashboards

## 🚀 Production Deployment

### Checklist

- [ ] Update API keys to live mode
- [ ] Configure production webhook URLs
- [ ] Set up SSL certificates
- [ ] Test payment flow end-to-end
- [ ] Monitor webhook delivery
- [ ] Set up error alerting
- [ ] Configure backup webhook endpoints

### Performance Optimization

- CDN for static assets
- Database indexing
- Caching strategies
- Load balancing

## 🆘 Support & Troubleshooting

### Common Issues

1. **Payment not processing**:
   - Check API keys
   - Verify webhook configuration
   - Check browser console for errors

2. **Orders not saving**:
   - Verify Firebase configuration
   - Check Firestore rules
   - Validate order data structure

3. **Webhook not receiving**:
   - Check webhook URL
   - Verify signature verification
   - Check server logs

### Getting Help

- Razorpay Support: [support.razorpay.com](https://support.razorpay.com)
- Firebase Support: [firebase.google.com/support](https://firebase.google.com/support)
- GitHub Issues: Create issue in repository

## 📝 License

This integration is part of the Hunar Gaatha project and follows the same license terms.

---

**Note**: Always test thoroughly in test mode before going live. Keep your API keys secure and never commit them to version control.
