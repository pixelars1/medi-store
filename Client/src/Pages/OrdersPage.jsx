// pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi"; // ✅ you'll create this API
import { Calendar, Package, DollarSign, Clock } from "lucide-react";

const OrdersPage = ({ darkMode }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders(); // fetch from backend
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-300">Loading orders...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-20 px-4 sm:px-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You don’t have any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`rounded-2xl p-6 shadow-md border transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Package size={18} /> Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold flex items-center gap-1">
                      <DollarSign size={14} /> {item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Clock size={14} /> Estimated Delivery:{" "}
                  {order.estimatedDelivery || "N/A"}
                </p>
                <p className="font-bold flex items-center gap-1">
                  <DollarSign size={16} /> Total: {order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
