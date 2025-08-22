'use client';

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle } from "lucide-react";

export default function OrdersPage() {
  // Mock orders (later fetch from Firestore)
  const orders = [
    {
      id: "ORD-1001",
      date: "2025-08-01",
      status: "Delivered",
      total: 560,
      items: [
        { name: "Flower Pot - 6 inch", qty: 2 },
        { name: "Kulhad Tea Cup - 100ml", qty: 6 }
      ]
    },
    {
      id: "ORD-1002",
      date: "2025-08-12",
      status: "Shipped",
      total: 350,
      items: [
        { name: "Doremon Piggy Bank", qty: 1 }
      ]
    },
    {
      id: "ORD-1003",
      date: "2025-08-18",
      status: "Pending",
      total: 999,
      items: [
        { name: "Black Pottery Bowl", qty: 3 }
      ]
    }
  ];

  const statusColors: Record<string, string> = {
    Pending: "text-[#7B2D26]",    // Rosewood
    Shipped: "text-[#D6A400]",    // Mustard
    Delivered: "text-[#4E6E58]"   // Forest Green
  };

  const statusIcons: Record<string, JSX.Element> = {
    Pending: <Package className="w-6 h-6" />,
    Shipped: <Truck className="w-6 h-6" />,
    Delivered: <CheckCircle className="w-6 h-6" />
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#2C2A4A] mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">You haven’t placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#2C2A4A]">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className={`flex items-center gap-2 font-medium ${statusColors[order.status]}`}>
                  {statusIcons[order.status]}
                  {order.status}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-gray-700">
                    <span>{item.name} × {item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold text-[#B66E41]">Total: ₹{order.total}</p>
                <button className="px-4 py-2 rounded-lg bg-[#2C2A4A] text-white hover:bg-[#1e1c3a] transition">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
